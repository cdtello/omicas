const { influxConnection } = require('../persistence/influxDbConecction')
const { Point } = require('@influxdata/influxdb-client')
const { formatData } = require('../utils/formatData')

exports.writeInfluxDB = async (dataIn) => {
    const connection = await influxConnection(1)

    const {payload, data}= await formatData(dataIn, {
        measurement: 'Potencia',
        ubicacion: 'omicasTest',
        dispositivo: 'moduloPotencia',
    })
    // await connection.writePoints(payload)
    // await connection.writePoints(data)
    connection.useDefaultTags(data.tags);
    const point1 = new Point('Potencia')
        .floatField('VBatt', 1000)
        .floatField('VStepUp', 2000)
    connection.writePoint(point1);

    await connection.close().then(
        () => console.log('WRITE FINISHED'),
        (e) => console.error(e))
}
