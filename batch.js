
//
const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function batchRead (client, argv) {
  const batch = argv.keys.map(key => {
    let request = {
      key: new Aerospike.Key(argv.namespace, argv.set, key)
    }
    if (argv.bins) {
      request.bins = argv.bins
    } else {
      request.read_all_bins = true
    }
    return request
  })

  const batchResults = await client.batchRead(batch)

  for (let result of batchResults) {
    let record = result.record
    console.info(record.key.key, ':', result.status === Aerospike.status.OK
      ? record.bins : 'NOT FOUND')
  }
}

exports.command = 'batch <keys..>'
exports.describe = 'Fetch multiple records from the database in a batch'
exports.handler = shared.run(batchRead)
exports.builder = {
  'bins': {
    describe: 'List of bins to fetch for each record',
    type: 'array',
    group: 'Command:'
  }
}
