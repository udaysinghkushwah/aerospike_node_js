

const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function add (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  const bins = shared.cli.parseBins(argv.bins)
  await client.add(key, bins)
  console.info('Record updated successfully:', key)
}

exports.command = 'add <key> <bins...>'
exports.describe = 'Add one or more values to existing bin(s)'
exports.handler = shared.run(add)
