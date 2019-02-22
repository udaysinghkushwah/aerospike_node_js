
//
const Aerospike = require('aerospike')
const shared = require('./shared')
const op = Aerospike.operations
const lists = Aerospike.lists

shared.runner()

async function operate (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)
  const i = shared.random.int(1, 10)
  let ops = [
    lists.append('values', i),
    op.read('values'),
    op.incr('sum', i),
    op.read('sum')
  ]
  const results = await client.operate(key, ops)
  console.info(results)
}

exports.command = 'operate <key>'
exports.describe = 'Perform multiple operations on a single record'
exports.handler = shared.run(operate)
