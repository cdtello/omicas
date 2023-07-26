export declare const formatData: (
    dataIn: any,
    params: any
) => Promise<{
    point: any
    data: {
        measurement: any
        fields: any
        tags: {
            DeviceEUI: any
            ubicacion: any
            dispositivo: any
        }
    }
}>
