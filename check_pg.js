const { Client } = require('pg');

async function check() {
    const connectionString = 'postgresql://postgres:qCLOzzSsQLcdGEYMnbqelEGYgUjxLysW@maglev.proxy.rlwy.net:54055/railway';
    const client = new Client({ connectionString });
    
    try {
        await client.connect();
        console.log('--- TABLES ---');
        const tables = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
        console.log(tables.rows.map(r => r.tablename).join(', '));
        
        console.log('\n--- SCHEMA ---');
        const schema = await client.query("SELECT nspname FROM pg_catalog.pg_namespace");
        console.log(schema.rows.map(r => r.nspname).join(', '));
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

check();
