"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const influxDbConecction_1 = require("../persistence/influxDbConecction");
exports.readInfluxDB = async (event, query) => {
    const result = [];
    const connection = await (0, influxDbConecction_1.influxReadConnection)();
    const queryTest = `
        from(bucket: "sensors")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "Potencia")
        |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
        |> yield(name: "mean")
        `;
    await connection.queryRows(queryTest, {
        next(row, tableMeta) {
            const item = tableMeta.toObject(row);
            result.push(item);
        },
        complete() {
            for (let i = 0; i < result.length; i++) {
                console.log('******* res -> ', result[i]);
            }
        },
        error(error) {
            console.log('****** FAILED ***', error);
        },
    });
};
//# sourceMappingURL=readInfluxDB.js.map