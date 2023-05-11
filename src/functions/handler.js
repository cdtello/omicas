'use strict'
const AWS = require('aws-sdk');
const timestream = new AWS.TimestreamWrite();
const { influxConnection } = require('../persistence/influxDbConecction')
const { readInfluxDB } = require('../services/readInfluxDB')
const { writeInfluxDB } = require('../services/writeInfluxDB')

module.exports.hello = async (event) => {
    // readInfluxDB(event, 'hola');
    const testBody = {
        deveui: 'ac1f09fffe0a9c17', // lo que llega del paylodar
        object: {
            VBatt: 1000, //
            VStepUp: 1000, //
        },
    }
    writeInfluxDB(testBody)
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

module.exports.hello = async (event) => {
    const record = event.Records[0];
    const data = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf8'));
  
    const dimensions = [
      { Name: 'measurement', Value: data.measurement },
      { Name: 'ubicacion', Value: data.ubicacion },
      { Name: 'dispositivo', Value: data.dispositivo },
      { Name: 'DeviceEUI', Value: data.DeviceEUI }
    ];
    
    const measureName = 'VBatt';
    const measureValue = data.VBatt;
    const measureTime = new Date(data.time);
  
    const params = {
      DatabaseName: 'my-database-name',
      TableName: 'my-table-name',
      Records: [
        {
          Dimensions: dimensions,
          MeasureName: measureName,
          MeasureValue: `${measureValue}`,
          MeasureValueType: 'DOUBLE',
          Time: `${measureTime.getTime()}`
        }
      ]
    };
  
    try {
      await timestream.writeRecords(params).promise();
      console.log(`Successfully wrote record with VBatt: ${measureValue}`);
    } catch (error) {
      console.error(`Error writing record to Timestream: ${error}`);
    }
  };
