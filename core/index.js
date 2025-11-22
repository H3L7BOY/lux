// core/index.js


sock.ev.on('connection.update', (u) => {
const { connection, lastDisconnect } = u;
if (connection === 'close') {
const err = lastDisconnect?.error;
logger.warn('connection closed', { err: err?.message });
} else if (connection === 'open') {
logger.info('connection opened');
}
});


const commands = loadCommands();
logger.info({ commandCount: commands.size }, 'Loaded commands');


sock.ev.on('messages.upsert', async (m) => {
try {
const [message] = m.messages;
if (!message) return;
if (!message.message) return;
if (message.key?.fromMe) return; // skip own messages


let text = '';
if (message.message.conversation) text = message.message.conversation;
else if (message.message.extendedTextMessage) text = message.message.extendedTextMessage.text;
else if (message.message.imageMessage?.caption) text = message.message.imageMessage.caption;


if (!text) return;
const prefix = process.env.COMMAND_PREFIX || '!';
if (!text.startsWith(prefix)) return;


const [cmdName, ...args] = text.slice(prefix.length).trim().split(/\s+/);
const cmd = commands.get(cmdName.toLowerCase());
if (!cmd) {
await sock.sendMessage(message.key.remoteJid, { text: `Unknown command: ${cmdName}` }, { quoted: message });
return;
}


await cmd.run({ sock, msg: message, args, sender: message.key.remoteJid });
} catch (e) {
logger.error(e);
}
});


return sock;
}


start().catch(err => {
console.error('Start error', err);
process.exit(1);
});