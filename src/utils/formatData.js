exports.formatData = async (dataIn, params = {}) => {
    const { measurement, ubicacion, dispositivo } = params
    const data = 
        {
            measurement,
            fields: dataIn.object,
            tags: {
                DeviceEUI: dataIn.deveui,
                ubicacion,
                dispositivo,
            },
    },
        
    payload = { payload: data }
    return { payload, data }
}
