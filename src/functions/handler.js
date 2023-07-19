'use strict'
const AWS = require('aws-sdk')
const timestream = new AWS.TimestreamWrite()
const { influxConnection } = require('../persistence/influxDbConecction')
const { readInfluxDB } = require('../services/readInfluxDB')
const { writeInfluxDB } = require('../services/writeInfluxDB')

module.exports.hello = async (event) => {
    // readInfluxDB(event, 'hola');
    console.log('event-> ', event);

    const { payload, WirelessDeviceId } = event;
    console.log('payload-> ', payload);
    console.log('WirelessDeviceId-> ', WirelessDeviceId);
    const bodyPayload = {
        deveui: WirelessDeviceId, // lo que llega del paylodar
        object: payload,
    }
    writeInfluxDB(bodyPayload)
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message:
                    'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
    }
}

module.exports.insert = async (event) => {
    const dimensions = [
        { Name: 'measurement', Value: 'Potencia' },
        { Name: 'ubicacion', Value: 'OmicasTest' },
        { Name: 'dispositivo', Value: '1234' },
        { Name: 'DeviceEUI', Value: '1234' },
        { Name: 'VBatt', Value: '1000' },
        { Name: 'VStepUp', Value: '2000' },
    ]

    const measureName = 'Potencia'
    const measureTime = new Date()
    const measureValue = '0.5'

    const params = {
        DatabaseName: 'omicas-device-database',
        TableName: 'omicas-device-table',
        Records: [
            {
                Dimensions: dimensions,
                MeasureName: measureName,
                MeasureValue: measureValue,
                Time: `${measureTime.getTime()}`,
            },
        ],
    }

    try {
        await timestream.writeRecords(params).promise()
        console.log(`Successfully wrote record with VBatt: ${measureValue}`)
    } catch (error) {
        console.error(`Error writing record to Timestream: ${error}`)
    }
}
