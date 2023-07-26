import { InfluxDB, QueryApi, WriteApi } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../../env'

export const influxWriteConnection = async () => {
    try {
        let result: WriteApi = await new InfluxDB({ url, token }).getWriteApi(
            org,
            bucket
        )
        console.log('conecction ->', result)
        return result
    } catch (error) {
        throw 'Error Influx Connection'
    }
}

export const influxReadConnection = async () => {
    try {
        const result: QueryApi = await new InfluxDB({ url, token }).getQueryApi(
            org
        )
        console.log('conecction ->', result)
        return result
    } catch (error) {
        throw 'Error Influx Connection'
    }
}
