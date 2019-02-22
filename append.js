

const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function append (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  const bins = shared.cli.parseBins(argv.bins)
  await client.append(key, bins)
  console.info('Record updated successfully:', key)
}

exports.command = 'append <key> <bins...>'
exports.describe = 'Append one or more values to existing bin(s)'
exports.handler = shared.run(append)
