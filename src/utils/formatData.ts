const { Point } = require('@influxdata/influxdb-client')
export const formatData = async (dataIn, params: any) => {
    const { measurement, ubicacion, dispositivo } = params
    const data = {
        measurement,
        fields: dataIn.object,
        tags: {
            DeviceEUI: dataIn.deveui,
            ubicacion,
            dispositivo,
        },
    }
    const point = new Point('Potencia')
    for (let key in dataIn.object) {
        point.floatField(key, dataIn.object[key])
    }

    return { point, data }
}
