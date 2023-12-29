import shiki from 'shiki'

const grammar = await Bun.file(import.meta.dir + '/goose.tmLanguage.json').json()
const theme = await Bun.file(import.meta.dir + '/theme.json').json()

const gooseSource = `\
import "std:fs"
import "std:json"

await fs.read("repos.json")
  -> json.decode(_)
  -> _.repos.find(fn(r) -> r.name == "goose")
  -> println("goose has \${_.stars} stars!")
`

async function highlight() {
  const highligher = await shiki.getHighlighter({
    theme,
    langs: [
      {
        id: 'goose',
        scopeName: 'source.goose',
        grammar,
        path: '',
      },
    ],
  })

  const html = highligher.codeToHtml(gooseSource, {
    lang: 'goose',
  })

  console.log(html)
}

highlight()
