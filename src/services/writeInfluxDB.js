const { influxConnection } = require('../persistence/influxDbConecction')
const { formatData } = require('../utils/formatData')

exports.writeInfluxDB = async (dataIn) => {
    const connection = await influxConnection(1)

    const { point, data } = await formatData(dataIn, {
        measurement: 'Potencia',
        ubicacion: 'omicasTest',
        dispositivo: 'moduloPotencia',
    })
    // await connection.writePoints(payload)
    // await connection.writePoints(data)
    connection.useDefaultTags(data.tags)

    connection.writePoint(point)

    await connection.close().then(
        () => console.log('WRITE FINISHED'),
        (e) => console.error(e)
    )
}
