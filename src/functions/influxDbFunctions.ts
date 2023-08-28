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
    const payload = event.decodingoutput.payload;
    const WirelessDeviceId = event.WirelessDeviceId;
    const dimensions = [
        { Name: 'module', Value: 'Potencia' },
        { Name: 'location', Value: 'OmicasTest' },
        { Name: 'deviceId', Value: WirelessDeviceId },
    ]

    for (const key in payload) {
        // dimensions.push({ Name: key, Value: payload[key].toString() });

        const measureTime = new Date()
    
        const params = {
            DatabaseName: 'omicas-device-database',
            TableName: 'omicas-device-table',
            Records: [
                {
                    Dimensions: dimensions,
                    MeasureName: key,
                    MeasureValue: payload[key].toString(),
                    Time: `${measureTime.getTime()}`,
                },
            ],
        }
          
        const command = new WriteRecordsCommand(params);
          
        try {
            await timestream.send(command);
            console.log(`Successfully wrote record with device: ${WirelessDeviceId}`)
        } catch (error) {
            console.error(`Error writing record to Timestream: ${error}`)
        }
    }


}
