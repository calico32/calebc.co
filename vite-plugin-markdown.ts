import fs from "node:fs"
import path from "node:path"
import url from "node:url"

import matter from "gray-matter"
import { marked } from "marked"
import { createHighlighter, type Highlighter } from "shiki"
import type { Plugin } from "vite"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

let highlighterPromise: Promise<Highlighter> | null = null
/** Shiki highlighter using the site's VS Code theme and a KDL grammar, loaded once and reused. */
function getSiteHighlighter(): Promise<Highlighter> {
	if (!highlighterPromise) {
		const theme = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, "src/shiki/theme.jsonc"), "utf8"),
		)
		const langs = ["src/shiki/kdl.tmLanguage.json", "src/shiki/ebnf.tmLanguage.json"]
		highlighterPromise = createHighlighter({
			themes: [{ ...theme, name: "site" }],
			langs: [
				"javascript",
				"typescript",
				"bash",
				"json",
				"html",
				"css",
				...langs.map((file) =>
					JSON.parse(fs.readFileSync(path.resolve(__dirname, file), "utf8")),
				),
			],
		})
	}
	return highlighterPromise
}

/** Compiles .md files at build time into `{ frontmatter, html }` modules. */
export function markdown(): Plugin {
	return {
		name: "markdown",
		async transform(code, id) {
			if (!id.endsWith(".md")) return
			const { data, content } = matter(code)
			// The leading h1 duplicates frontmatter.name; the card header renders it instead.
			const body = content.replace(/^\s*# .+\n/, "")
			const highlighter = await getSiteHighlighter()
			const renderer = new marked.Renderer()
			renderer.code = ({ text, lang }) => {
				const loaded = highlighter.getLoadedLanguages()
				return highlighter.codeToHtml(text, {
					lang: lang && loaded.includes(lang) ? lang : "text",
					theme: "site",
				})
			}
			const html = marked.parse(body, { renderer }) as string
			// Turn relative image srcs into module imports so Vite bundles them
			// (converted to AVIF by the cardImages plugin below).
			const imports: string[] = []
			const tokenized = html.replace(/src="(\.\.?\/[^"]+)"/g, (_, src) => {
				const i = imports.length
				imports.push(`import __img${i} from ${JSON.stringify(`${src}?card-img`)}`)
				return `src="\x00${i}\x00"`
			})
			const htmlCode = JSON.stringify(tokenized).replace(
				/\\u0000(\d+)\\u0000/g,
				(_, i) => `" + __img${i} + "`,
			)
			return {
				code:
					imports.join("\n") +
					`\nexport const frontmatter = ${JSON.stringify(data)}\n` +
					`export const html = ${htmlCode}\n`,
				map: null,
			}
		},
	}
}

/** Resolves `?card-img` imports: AVIF-encoded emitted asset in build, original file in dev. */
export function cardImages(): Plugin {
	let isBuild = false
	return {
		name: "card-images",
		enforce: "pre",
		configResolved(config) {
			isBuild = config.command === "build"
		},
		async load(id) {
			if (!id.includes("?card-img")) return
			const file = id.split("?")[0]
			if (!isBuild) {
				const devUrl = `/${path.relative(path.resolve(__dirname, "src"), file)}`
				return `export default ${JSON.stringify(devUrl)}`
			}
			const { createCanvas, loadImage } = await import("@napi-rs/canvas")
			const image = await loadImage(file)
			const canvas = createCanvas(image.width, image.height)
			canvas.getContext("2d").drawImage(image, 0, 0)
			const source = await canvas.encode("avif", { quality: 70 })
			const ref = this.emitFile({
				type: "asset",
				name: path.basename(file).replace(/\.\w+$/, ".avif"),
				source,
			})
			return `export default import.meta.ROLLUP_FILE_URL_${ref}`
		},
	}
}
