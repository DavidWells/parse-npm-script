const parse = require('./parser')
const parseJson = require('./parse-json')

/**
 * Parse npm package script command
 * @param  {object|string} pkgOrObject - path to package.json or resolved pkg object
 * @param  {string}  command - npm script command to resolve & parse
 * @return {Promise} - resolved command data
 */
async function parseNpmScript(pkgOrObject, command) {
  if (typeof pkgOrObject === 'object') {
    return parse(pkgOrObject, command)
  }
  const pkg = await parseJson(pkgOrObject)
  return parse(pkg, command)
}

module.exports = parseNpmScript
