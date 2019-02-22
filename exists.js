

const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function exists (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  const exists = await client.exists(key)
  console.info('Key: ', key)
  console.info('Record exists: ', exists)
}

exports.command = 'exists <key>'
exports.describe = 'Test whether a record exists in the database'
exports.handler = shared.run(exists)
