

const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function remove (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  await client.remove(key)
  console.info('Removed record:', key)
}

exports.command = 'remove <key>'
exports.describe = 'Remove a record from the database'
exports.handler = shared.run(remove)
