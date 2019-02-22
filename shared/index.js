

const path = require('path')

exports.cli = require('./cli')
exports.client = require('./client')
exports.random = require('./random')
exports.run = require('./run')
exports.streams = require('./streams')

// Check whether example has been executed directly or via the runner
// (./run.js); if directly, invoke the runner instead and pass the command
// line arguments.
let started = false
exports.runner = function () {
  if (started || require.main !== module.parent) {
    return
  }
  started = true

  let example = process.argv[1]
  let runner = path.join(example, '../run.js')
  let cmd = path.basename(example, '.js')

  process.argv.splice(1, 1, runner, cmd)
  delete require.cache[require.resolve(example)]

  require(runner)
}
