// utils/media.js
const fs = require('fs');
const { downloadContentFromMessage } = require('@adiwajshing/baileys');


async function downloadMedia(message, mediaType = 'image', dest = './tmp/received') {
if (!message) throw new Error('no message');
const stream = await downloadContentFromMessage(message, mediaType);
let buffer = Buffer.from([]);
for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
fs.mkdirSync(require('path').dirname(dest), { recursive: true });
fs.writeFileSync(dest, buffer);
return dest;
}


module.exports = { downloadMedia };