const { Client } = require('pg');

async function debug() {
    const connectionString = 'postgresql://postgres:qCLOzzSsQLcdGEYMnbqelEGYgUjxLysW@maglev.proxy.rlwy.net:54055/railway';
    const client = new Client({ connectionString });
    try {
        await client.connect();
        const res = await client.query('SELECT id, raw_content FROM "Capture" ORDER BY created_at DESC LIMIT 5');
        console.log('--- RECENT CAPTURES ON RAILWAY ---');
        res.rows.forEach(r => console.log(`ID: ${r.id} | Content: ${r.raw_content.substring(0, 100)}...`));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
debug();
