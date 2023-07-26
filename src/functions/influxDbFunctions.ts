import { TimestreamWriteClient, WriteRecordsCommand } from "@aws-sdk/client-timestream-write";
import { writeInfluxDB } from '../services/writeInfluxDB'

const timestream = new TimestreamWriteClient({ region: "eu-central-1" });
export const pushInfluxDb = async (event) => {
    // const { payload, WirelessDeviceId } = event;
    const payload = event.decodingoutput.payload;
    const WirelessDeviceId = event.WirelessDeviceId;
    console.log('*** event-> ', event)
    const bodyPayload = {
        deveui: WirelessDeviceId,
        object: payload,
    }
    await writeInfluxDB(bodyPayload)
    return {
        statusCode: 200,
        data: 'hello data',
    }
}

export const insert = async (event) => {
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
      
      const command = new WriteRecordsCommand(params);
      
    try {
        await timestream.send(command);
        console.log(`Successfully wrote record with VBatt: ${measureValue}`)
    } catch (error) {
        console.error(`Error writing record to Timestream: ${error}`)
    }
}
