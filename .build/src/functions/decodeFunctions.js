"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    const body = event.body || '';
    const { PayloadData, Fport } = JSON.parse(body);
    console.log('PayloadData: ', PayloadData);
    console.log('Fport: ', Fport);
    const payload = await Decode(PayloadData);
    return {
        statusCode: 200,
        body: JSON.stringify(payload),
    };
};
exports.handler = handler;
function Decode(data) {
    const bytes = Buffer.from(data, 'base64');
    const decoded = {};
    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var status = bytes[i++];
        var channel_type = bytes[i++];
        if (channel_id === 0x04 && channel_type === 0x74) {
            console.log('1');
            decoded.VBatt = bytes[i] / 10;
            i += 1;
        }
        else if (channel_id === 0x05 && channel_type === 0x74) {
            console.log('2');
            decoded.VStepUp = bytes[i] / 10;
            i += 1;
        }
        else if (channel_id === 0x06 && channel_type === 0x80) {
            console.log('3');
            decoded.CBatt = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        else if (channel_id === 0x07 && channel_type === 0x80) {
            console.log('4');
            decoded.CCell = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        else {
            break;
        }
    }
    return decoded;
}
function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}
function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}
//# sourceMappingURL=decodeFunctions.js.map