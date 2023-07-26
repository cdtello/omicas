import { influxReadConnection } from '../persistence/influxDbConecction'

exports.readInfluxDB = async (event, query) => {
    const result: { [key: string]: any }[] = []
    const connection = await influxReadConnection()
    const queryTest = `
        from(bucket: "sensors")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "Potencia")
        |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
        |> yield(name: "mean")
        `
    await connection.queryRows(queryTest, {
        next(row, tableMeta) {
            const item = tableMeta.toObject(row)
            result.push(item)
        },
        complete() {
            //nested for loops aren't ideal, this could be optimized but gets the job done
            for (let i = 0; i < result.length; i++) {
                console.log('******* res -> ', result[i])
            }
        },
        error(error) {
            console.log('****** FAILED ***', error)
        },
    })
}
