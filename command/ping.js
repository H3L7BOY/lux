// commands/ping.js
module.exports = {
name: 'ping',
description: 'Replies with pong and latency',
async run({ sock, msg, args, sender }) {
const t0 = Date.now();
await sock.sendMessage(sender, { text: 'Pinging...' }, { quoted: msg });
const latency = Date.now() - t0;
await sock.sendMessage(sender, { text: `Pong — ${latency}ms` }, { quoted: msg });
}
};