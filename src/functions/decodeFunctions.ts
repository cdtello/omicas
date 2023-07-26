import { APIGatewayProxyHandler } from 'aws-lambda'
import { decoded } from 'src/utils/models'

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log(event)
    // const payload =  Decode(event.PayloadData, 2)
    const payload = Decode('abcd', 2)
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                data: payload,
                input: event,
            },
            null,
            2
        ),
    }
}

function Decode(data: string, fPort) {
    const bytes = Buffer.from(data, 'base64')
    const decoded: decoded = {}
    for (var i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++]
        var status = bytes[i++]
        var channel_type = bytes[i++]

        // VBATT

        if (channel_id === 0x04 && channel_type === 0x74) {
            console.log('1')
            decoded.VBatt = bytes[i] / 10
            i += 1
        }
        // VStepUp
        else if (channel_id === 0x05 && channel_type === 0x74) {
            console.log('2')
            decoded.VStepUp = bytes[i] / 10
            i += 1
        }
        // CBatt
        else if (channel_id === 0x06 && channel_type === 0x80) {
            console.log('3')
            // decoded.CBatt = bytes[i] / 10;
            decoded.CBatt = readInt16LE(bytes.slice(i, i + 2)) / 10
            i += 2
        }
        // CCell
        else if (channel_id === 0x07 && channel_type === 0x80) {
            console.log('4')
            //decoded.CCell = bytes[i] / 10;
            decoded.CCell = readInt16LE(bytes.slice(i, i + 2)) / 10
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
