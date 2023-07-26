"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.influxConnection = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const env_1 = require("../../env");
const influxConnection = async (type) => {
    console.log('url ->', env_1.url);
    console.log('token ->', env_1.token);
    console.log('org ->', env_1.org);
    console.log('bucket ->', env_1.bucket);
    try {
        let result;
        type === 1
            ? (result = await new influxdb_client_1.InfluxDB({ url: env_1.url, token: env_1.token }).getWriteApi(env_1.org, env_1.bucket))
            : (result = await new influxdb_client_1.InfluxDB({ url: env_1.url, token: env_1.token }).getQueryApi(env_1.org));
        console.log('conecction ->', result);
        return result;
    }
    catch (error) {
        throw 'Error Influx Connection';
    }
};
exports.influxConnection = influxConnection;
//# sourceMappingURL=influxDbConecction.js.map