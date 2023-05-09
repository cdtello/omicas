exports.formatData = async (dataIn, params = {}) => {
    const { measurement, ubicacion, dispositivo } = params
    const data = [
        {
            measurement,
            fields: dataIn.object,
            tags: {
                DeviceEUI: dataIn.deveui,
                ubicacion,
                dispositivo,
            },
        },
    ]
    return { payload: data }
}
