

const util = require('util')

function str2num (value) {
  return isNaN(value) ? value : +value
}

// @param { String[] } binStrs - list of "<name>=<value>" pairs
exports.parseBins = function (binStrs) {
  return binStrs.reduce((bins, current) => {
    let [name, value] = current.split('=')
    bins[name] = str2num(value)
    return bins
  }, {})
}

exports.printRecord = function (record) {
  let key = record.key.key || record.key.digest.toString('hex')
  console.info('%s: %s', key, util.inspect(record.bins))
}
