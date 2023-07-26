"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.influxReadConnection = exports.influxWriteConnection = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const env_1 = require("../../env");
const influxWriteConnection = async () => {
    try {
        let result = await new influxdb_client_1.InfluxDB({ url: env_1.url, token: env_1.token }).getWriteApi(env_1.org, env_1.bucket);
        console.log('conecction ->', result);
        return result;
    }
    catch (error) {
        throw 'Error Influx Connection';
    }
};
exports.influxWriteConnection = influxWriteConnection;
const influxReadConnection = async () => {
    try {
        const result = await new influxdb_client_1.InfluxDB({ url: env_1.url, token: env_1.token }).getQueryApi(env_1.org);
        console.log('conecction ->', result);
        return result;
    }
    catch (error) {
        throw 'Error Influx Connection';
    }
};
exports.influxReadConnection = influxReadConnection;
//# sourceMappingURL=influxDbConecction.js.map