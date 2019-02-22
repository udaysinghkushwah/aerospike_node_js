

const Aerospike = require('aerospike')
const path = require('path')

const UDF_USERDIR = path.normalize(path.join(__dirname, '..', 'lua'))

module.exports = exports = function (argv) {
  const config = defaultConfig(argv)
  Aerospike.setDefaultLogging(config.log)
  const client = Aerospike.client(config)
  client.captureStackTraces = argv.debugStacktraces
  return client
}

function defaultConfig (argv) {
  let defaultPolicy = {
    totalTimeout: argv.timeout
  }
  return {
    hosts: argv.hosts,
    port: argv.port,
    policies: {
      apply: defaultPolicy,
      batch: defaultPolicy,
      info: defaultPolicy,
      operate: defaultPolicy,
      query: defaultPolicy,
      read: defaultPolicy,
      remove: defaultPolicy,
      scan: defaultPolicy,
      write: defaultPolicy
    },
    modlua: {
      userPath: UDF_USERDIR
    },
    log: {
      level: Aerospike.log.WARN + argv.verbose
    }
  }
}
