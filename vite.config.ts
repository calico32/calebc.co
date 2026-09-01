import path from "node:path"
import url from "node:url"

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import inspect from "vite-plugin-inspect"

import { cardImages, markdown } from "./vite-plugin-markdown"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
	root: "src",
	publicDir: "../assets",
	appType: "spa",
	plugins: [
		markdown(),
		cardImages(),
		inspect(),
		tailwindcss(),
		handlebars({
			partialDirectory: path.resolve(__dirname, "src/partials"),
		}),
	],
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				index: path.resolve(__dirname, "src/index.html"),
			},
		},
	},
	server: {
		allowedHosts: ["pangolin"],
	},
})
