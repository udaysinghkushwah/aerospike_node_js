

const shared = require('./')

module.exports = exports = function (handler) {
  return async function (argv) {
    const client = shared.client(argv)
    try {
      await client.connect()
      await handler(client, argv)
    } catch (error) {
      console.error(error)
    }
    client.close()
  }
}
