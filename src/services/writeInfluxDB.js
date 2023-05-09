const { influxConnection } = require('../persistence/influxDbConecction')

exports.readInfluxDB = async (event, query) => {
    const connection = await influxConnection(1)

    // parse the expected JSON from the body of the POST request
    let body = JSON.parse(event.body)
    // //create a data point with health as the measurement name, a field value for heart beat, and userID tag
    const dataPoint = new Point('health')
        .tag('userID', body['userID'])
        .floatField('heartRate', body['heartbeatRate'])
    // //write data point
    await writeApi.writePoint(dataPoint)

    //close write API
    await writeApi.close().then(() => {
        console.log('WRITE FINISHED')
    })

    //send back response to the client
    const response = {
        statusCode: 200,
        body: JSON.stringify('Write successful'),
    }
}
