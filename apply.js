
//
const Aerospike = require('aerospike')
const shared = require('./shared')

shared.runner()

async function apply (client, argv) {
  const key = new Aerospike.Key(argv.namespace, argv.set, argv.key)

  const udfCall = {
    module: argv.module,
    funcname: argv.function,
    args: argv.args.map(arg => {
      try {
        return JSON.parse(arg)
      } catch (error) {
        return '' + arg
      }
    })
  }

  const result = await client.apply(key, udfCall)
  console.info(result)
}

exports.command = 'apply <key> <module> <function> [args...]'
exports.describe = 'Apply a User-Defined Function (UDF) to a record'
exports.handler = shared.run(apply)
