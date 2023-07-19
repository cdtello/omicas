//import InfluxDB client, this is possible thanks to the layer we created
const { InfluxDB } = require('@influxdata/influxdb-client')
const { url, token, org, bucket } = require('../../env')

//lambda event handler, this code is ran on every external request
exports.influxConnection = async (type) => {
    try {
        let result
        type === 1
            ? (result = await new InfluxDB({ url, token }).getWriteApi(org, bucket))
            : (result = await new InfluxDB({ url, token }).getQueryApi(org, bucket))
        return result
    } catch (error) {
        throw 'Error Influx Connection';
    }
    
}
