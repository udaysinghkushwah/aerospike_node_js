
//
const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function get (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  let record
  if (argv.bins) {
    record = await client.select(key, argv.bins)
  } else {
    record = await client.get(key)
  }
  console.info(record)
}

exports.command = 'get <key>'
exports.describe = 'Fetch a record from the database'
exports.handler = shared.run(get)
exports.builder = {
  bins: {
    desc: 'Select specific bins to fetch',
    type: 'array'
  }
}
