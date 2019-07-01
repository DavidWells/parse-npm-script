import test from 'ava'
import path from 'path'
import parser from '../lib'

const packagePath = path.join(__dirname, 'fixtures/one.json')

test('Base api returns correct values', async (t) => {
  const contents = await parser(packagePath, 'npm run build')
  // Input command
  t.is(contents.command, 'npm run build')
  // Steps
  t.is(Array.isArray(contents.steps), true)
  t.deepEqual(contents.steps.map((x) => {
    return x.name
  }), ['prebuild', 'build', 'postbuild'])

  // Raw commands to run
  t.is(Array.isArray(contents.raw), true)
  t.deepEqual(contents.raw, ['echo a', 'echo foo', 'echo b', 'echo cleanup', 'echo c'])

  // Combined script to run
  t.is(contents.combined, 'echo a && echo foo && echo b && echo cleanup && echo c')
})

const packageTwoPath = path.join(__dirname, 'fixtures/package.json')

test('npm test works', async (t) => {
  const contents = await parser(packageTwoPath, 'npm test')
  t.is(contents.command, 'npm test')
  t.is(Array.isArray(contents.steps), true)

  t.is(Array.isArray(contents.raw), true)
  t.deepEqual(contents.raw, [ 'echo \'hahax\'',
    'echo \'lol\'',
    'echo \'pretest\'',
    'sls info',
    'ava xyz',
    'md-magic --path \'**/*.md\' --ignore \'node_modules\'',
    'echo after'
  ])

  t.is(contents.combined, 'echo \'hahax\' && echo \'lol\' && echo \'pretest\' && sls info && ava xyz && md-magic --path \'**/*.md\' --ignore \'node_modules\' && echo after')
})

test('throws when npm script not found', async t => {
  await t.throwsAsync(async () => {
    await parser(packageTwoPath, 'npm run nooooooo')
    // throw new Error('🦄')
  }, {instanceOf: Error, message: 'npm script "nooooooo" not found'})
})
