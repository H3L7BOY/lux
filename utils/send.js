// utils/send.js
async function sendButtons(sock, jid, text, buttons = [], quoted) {
const msg = { text, footer: 'Lux', buttons, headerType: 1 };
return sock.sendMessage(jid, msg, { quoted });
}


async function sendImage(sock, jid, bufferOrUrl, caption = '', quoted) {
const message = typeof bufferOrUrl === 'string' ? { image: { url: bufferOrUrl }, caption } : { image: bufferOrUrl, caption };
return sock.sendMessage(jid, message, { quoted });
}


module.exports = { sendButtons, sendImage };