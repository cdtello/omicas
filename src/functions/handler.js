'use strict'

const { influxConnection } = require('../persistence/influxDbConecction')
const { readInfluxDB } = require('../services/readInfluxDB')
const { writeInfluxDB } = require('../services/writeInfluxDB')

module.exports.hello = async (event) => {
    // readInfluxDB(event, 'hola');
    const testBody = {
        deveui: 'ac1f09fffe0a9c17',
        object: {
            VBatt: 1000,
            VStepUp: 1000,
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

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
