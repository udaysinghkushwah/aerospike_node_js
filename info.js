

const shared = require('./shared')

shared.runner()

async function info (client, argv) {
  const request = argv.requests.join('\n')
  if (argv.all) {
    return infoAll(client, request)
  } else if (argv.addr) {
    return infoHost(client, request, argv.addr)
  } else {
    return infoAny(client, request)
  }
}

async function infoAny (client, request) {
  let response = await client.infoAny(request)
  if (response) {
    console.info(response.trim())
  } else {
    console.info('Invalid request')
  }
}

async function infoAll (client, request) {
  let responses = await client.infoAll(request)
  if (responses.some((response) => response.info)) {
    responses.map((response) => {
      console.info(`${response.host.node_id}:`)
      console.info(response.info.trim())
    })
  } else {
    console.info('Invalid request')
  }
}

async function infoHost (client, request, host) {
  let response = await client.info(request, host)
  if (response) {
    console.info(response.trim())
  } else {
    console.info('Invalid request')
  }
}

exports.command = 'info <requests...>'
exports.describe = 'Send an info request to the cluster'
exports.handler = shared.run(info)
exports.builder = {
  'any': {
    describe: 'Send request to a single, randomly selected cluster node',
    type: 'boolean',
    group: 'Command:',
    conflicts: ['all', 'addr']
  },
  'all': {
    describe: 'Send request to all cluster nodes',
    type: 'boolean',
    group: 'Command:',
    conflicts: ['any', 'addr']
  },
  'addr': {
    describe: 'Send request to specified cluster node',
    type: 'string',
    group: 'Command:',
    conflicts: ['any', 'all']
  }
}
