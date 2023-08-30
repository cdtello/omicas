import { Decoded } from 'src/utils/models'

export const handler = async (event) => {
    const { PayloadData } = event;
    const payload = await Decode(PayloadData);
    const measureTime = new Date()
    return {
        statusCode: 200,
        year: measureTime.getUTCFullYear().toString(),
        month: (measureTime.getUTCMonth() + 1).toString().padStart(2, '0'),
        day: measureTime.getUTCDate().toString().padStart(2, '0'),
        payload,
    }
}

function Decode(data: string) {
    const bytes = Buffer.from(data, 'base64')
    const decoded: Decoded = {}
    for (var i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++]
        var status = bytes[i++]
        var channel_type = bytes[i++]

        // Battery Voltage
        if (channel_id === 0x04 && channel_type === 0x74) {
            console.log('1')
            decoded.VBatt = bytes[i] / 10
            i += 1
        }
        // StepUp Voltage
        else if (channel_id === 0x05 && channel_type === 0x74) {
            console.log('2')
            decoded.VStepUp = bytes[i] / 10
            i += 1
        }
        // Battery Current
        else if (channel_id === 0x06 && channel_type === 0x80) {
            console.log('3')
            // decoded.CBatt = bytes[i] / 10;
            decoded.CBatt = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Cell Current
        else if (channel_id === 0x07 && channel_type === 0x80) {
            console.log('4')
            //decoded.CCell = bytes[i] / 10;
            decoded.CCell = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Air Temperature
        else if (channel_id === 0x01 && channel_type === 0x67) {
            console.log('5')
            decoded.AirTemp = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Air Humidity
        else if (channel_id === 0x01 && channel_type === 0x68) {
            console.log('6')
            decoded.AirHum = readInt16LE(bytes.slice(i, i + 2)) /10
            i += 2
        } 
        // Radiation
        else if (channel_id === 0x01 && channel_type === 0x66) {
            console.log('7')
            decoded.Rad = readInt16LE(bytes.slice(i, i + 2)) * 10
            i += 2
        }
        // Air Velocity
        else if (channel_id === 0x01 && channel_type === 0x92) {
            console.log('8')
            decoded.AirVel = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Air Direction
        else if (channel_id === 0x01 && channel_type === 0x84) {
            console.log('9')
            decoded.AirDir = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Soil Conductivity
        else if (channel_id === 0x03 && channel_type === 0x66) {
            console.log('10')
            decoded.SoilCond = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Soil PH
        else if (channel_id === 0x03 && channel_type === 0x7E) {
            console.log('11')
            decoded.SoilPh = readInt16LE(bytes.slice(i, i + 2)) / 10 
            i += 2
        }
        // Soil Humidity
        else if (channel_id === 0x03 && channel_type === 0x68) {
            console.log('12')
            decoded.SoilHum = readInt16LE(bytes.slice(i, i + 2)) / 10 
            i += 2
        }
        // Soil Temperaure
        else if (channel_id === 0x03 && channel_type === 0x67) {
            console.log('13')
            decoded.SoilTemp = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        } 
        // Soil Nitrogen
        else if (channel_id === 0x03 && channel_type === 0x92) {
            console.log('14')
            decoded.SoilNit = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Soil Phosphorus
        else if (channel_id === 0x03 && channel_type === 0x84) {
            console.log('15')
            decoded.SoilPhos = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // Soil Potasium
        else if (channel_id === 0x03 && channel_type === 0x7A) {
            console.log('16')
            decoded.SoilPot = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        } else {
            break
        }
    }
    return decoded
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0]
    return value & 0xffff
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes)
    return ref > 0x7fff ? ref - 0x10000 : ref
}
