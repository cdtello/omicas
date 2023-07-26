import { influxConnection } from '../persistence/influxDbConecction'
import { formatData } from '../utils/formatData'

export const writeInfluxDB = async (dataIn) => {
    try {
        const connection = await influxConnection(1)

        const { point, data } = await formatData(dataIn, {
            measurement: 'Potencia',
            ubicacion: 'omicasTest',
            dispositivo: 'moduloPotencia',
        })
        console.log('*** Data: ', data)
        console.log('*** point: ', point)
        // await connection.writePoints(payload)
        // await connection.writePoints(data)
        // connection.useDefaultTags(data.tags)

        connection.writePoint(point)

        await connection.close().then(
            () => console.log('WRITE FINISHED'),
            (e) => console.error(e)
        )
    } catch (error) {
        console.log('Error escritura')
    }
}
