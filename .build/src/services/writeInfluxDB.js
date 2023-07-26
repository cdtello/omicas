"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInfluxDB = void 0;
const influxDbConecction_1 = require("../persistence/influxDbConecction");
const formatData_1 = require("../utils/formatData");
const writeInfluxDB = async (dataIn) => {
    try {
        const connection = await (0, influxDbConecction_1.influxConnection)(1);
        const { point, data } = await (0, formatData_1.formatData)(dataIn, {
            measurement: 'Potencia',
            ubicacion: 'omicasTest',
            dispositivo: 'moduloPotencia',
        });
        console.log('*** Data: ', data);
        console.log('*** point: ', point);
        connection.writePoint(point);
        await connection.close().then(() => console.log('WRITE FINISHED'), (e) => console.error(e));
    }
    catch (error) {
        console.log("Error escritura");
    }
};
exports.writeInfluxDB = writeInfluxDB;
//# sourceMappingURL=writeInfluxDB.js.map