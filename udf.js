
//
const shared = require('./shared')
const path = require('path')

shared.runner()

async function udfRegister (client, argv) {
  let module = argv.module
  let job = await client.udfRegister(module)
  await job.waitUntilDone()
  console.info('UDF module registered successfully')
}

async function udfRemove (client, argv) {
  let module = path.basename(argv.module)
  let job = await client.udfRemove(module)
  await job.waitUntilDone()
  console.info('UDF module removed successfully')
}

exports.command = 'udf <command>'
exports.describe = 'Manage User-Defined Functions (UDF)'
exports.builder = yargs => {
  return yargs
    .command({
      command: 'register <module>',
      desc: 'Register a new UDF module with the cluster',
      handler: shared.run(udfRegister)
    })
    .command({
      command: 'remove <module>',
      desc: 'Remove a UDF module from the cluster',
      handler: shared.run(udfRemove)
    })
}
