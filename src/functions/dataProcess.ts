import * as AWS from 'aws-sdk';
import * as parquet from 'parquetjs-lite';

const fs = require("fs");
const s3 = new AWS.S3();

export const handler = async (event, context) => {
    try {
        const records = event.records.map(record => Buffer.from(record.data, 'base64').toString('utf-8'));
        

        const schema = new parquet.ParquetSchema({
            module: { type: 'UTF8' },
            location: { type: 'UTF8' },
            deviceId: { type: 'UTF8' },
            MeasureName: { type: 'UTF8' },
            MeasureValue: { type: 'DOUBLE' },
            Time: { type: 'TIMESTAMP_MILLIS' }
        });
        const date = new Date();
        const timestamp = date.getTime().toString();

        const writer = await parquet.ParquetWriter.openFile(schema, '/tmp/example.parquet');
        
        let rowData;
        for (const record of records) {
            const data = JSON.parse(record);
            const payload = data.decodingoutput.payload;
            for (const key in payload) {
                rowData = {
                    module: 'Potencia',
                    location: 'Omicas',
                    deviceId: data.WirelessDeviceId,
                    MeasureName: key,
                    MeasureValue: payload[key].toString(),
                    Time: timestamp  // Puedes usar la hora actual o la proporcionada en el evento
                };
                await writer.appendRow(rowData);
            }
        }

        writer.close(); // Close the writer after writing all rows
        const fileStream = fs.createReadStream("/tmp/example.parquet");


        // Obtener partes de la fecha para la clave en S3
        
        const year = date.getUTCFullYear().toString();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        

        const s3Key = `${rowData.deviceId}/${year}/${month}/${day}/fiel_${timestamp}.parquet`;

        const s3Params: AWS.S3.PutObjectRequest = {
            Bucket: 'omicas-phenoagro-cured-data',
            Key: s3Key,
            Body: fileStream
        };

        await s3.upload(s3Params).promise();

        return {
            statusCode: 200,
            body: 'Archivos Parquet creados y guardados en S3 correctamente.'
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};