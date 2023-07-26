//import InfluxDB client, this is possible thanks to the layer we created
import { InfluxDB } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../../env'

//lambda event handler, this code is ran on every external request
export const influxConnection = async (type) => {
    console.log('url ->', url)
    console.log('token ->', token)
    console.log('org ->', org)
    console.log('bucket ->', bucket)
    try {
        let result
        type === 1
            ? (result = await new InfluxDB({ url, token }).getWriteApi(
                  org,
                  bucket
              ))
            : (result = await new InfluxDB({ url, token }).getQueryApi(org))
        console.log('conecction ->', result)
        return result
    } catch (error) {
        throw 'Error Influx Connection'
    }
}
