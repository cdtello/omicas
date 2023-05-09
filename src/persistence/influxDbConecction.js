//import InfluxDB client, this is possible thanks to the layer we created
const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const { url, token, org, bucket } = require('../../env')
console.log('URL *****', url)
console.log('TOKEN *****', token)
console.log('ORG *****', org)
console.log('BUCKET *****', bucket)

//lambda event handler, this code is ran on every external request
exports.influxConnection = async (type) => {
    let result
    type === 1
        ? (result = await new InfluxDB({ url, token }).getWriteApi(org, bucket))
        : (result = await new InfluxDB({ url, token }).getQueryApi(org, bucket))
    return result
}
