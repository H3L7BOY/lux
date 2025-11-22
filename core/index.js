require('dotenv').config();
const { createClient } = require('./client');
const { createHandler } = require('./handler');
const { init, db } = require('../db/db');
const { watchFolder, clearRequire } = require('../system/hotReload');
const path = require('path');

async function start() {
  await init();
  const sock = await createClient();
  const handler = createHandler({ sock, db });

  // message events
  sock.ev.on('messages.upsert', async (m) => {
    await handler(m);
  });

  // hot reload commands
  watchFolder(path.join(__dirname, '..', 'commands'), (ev, file) => {
    clearRequire(file);
    console.log('command changed:', ev, file);
  });

  console.log('Lux started');
}

start().catch(e => {
  console.error('startup error', e);
  process.exit(1);
});
