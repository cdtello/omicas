const { influxConnection } = require('../persistence/influxDbConecction')

exports.readInfluxDB = async (event, query) => {
    let res = []
    const connection = await influxConnection(0)
    const queryTest = `
        from(bucket: "sensors")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "Potencia")
        |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
        |> yield(name: "mean")
        `
    await connection.queryRows(queryTest, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row)
            res.push(o)
        },
        complete() {
            //nested for loops aren't ideal, this could be optimized but gets the job done
            for (let i = 0; i < res.length; i++) {
                console.log('******* res -> ', res[i])
            }
        },
        error(error) {
            console.log('****** FAILED ***', error)
        },
    })
}
