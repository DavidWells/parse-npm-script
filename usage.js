const path = require('path')
const util = require('util')
const parse = require('./lib')

/* path to your package.json file */
const packagePath = path.join(__dirname, 'tests/fixtures/one.json')

async function runParser() {
  const parsed = await parse(packagePath, 'yarn run build')
  console.log(util.inspect(parsed, {
    showHidden: false,
    depth: null
  }))
}

runParser()

/* Parsed contents
{
  command: 'npm run build',
  steps: [{
      name: 'prebuild',
      raw: 'echo a && npm run foo',
      parsed: ['echo a', 'echo foo']
    },
    {
      name: 'build',
      raw: 'echo b && npm run cleanup',
      parsed: ['echo b', 'echo cleanup']
    },
    {
      name: 'postbuild',
      raw: 'echo c',
      parsed: 'echo c'
    }
  ],
  raw: ['echo a', 'echo foo', 'echo b', 'echo cleanup', 'echo c'],
  combined: 'echo a && echo foo && echo b && echo cleanup && echo c'
}
*/
