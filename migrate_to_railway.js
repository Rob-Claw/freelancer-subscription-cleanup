const { Client } = require('pg');
const fs = require('fs');

async function migrate() {
    const connectionString = 'postgresql://postgres:qCLOzzSsQLcdGEYMnbqelEGYgUjxLysW@maglev.proxy.rlwy.net:54055/railway';
    const client = new Client({ connectionString });
    
    try {
        await client.connect();
        console.log('Connected to Railway PostgreSQL');
        
        // 1. Find the next available ID for Capture
        const maxIdRes = await client.query('SELECT MAX(id) FROM "Capture"');
        const nextId = (maxIdRes.rows[0].max || 0) + 1;
        console.log(`Using ID ${nextId} for new Capture`);

        const rawContent = `Create 5 LinkedIn posts for Gabriel about AI/ML evolution. Mix of educational and personal angles:

1. Personal 'Then vs Now' post: Gabriel's 2018 startup building influence scoring with LSTMs vs 2025 using frontier AI APIs. Focus on how the moat moved from 'building ML' to 'applying it strategically.' Tone: reflective, humble, forward-looking.

2. Pure technical explainer: Why attention mechanisms beat RNNs for sequence modeling. Visual/accessible explanation of the bottleneck problem and how attention solves it. No personal story.

3. Quick educational: Parameters vs FLOPs - what those numbers actually mean for practitioners. Simple definitions, real examples.

4. Concept comparison: Masked (BERT) vs Autoregressive (GPT) models. When to use which. Clear use cases.

5. Industry observation: The end of the data labeling era. How self-supervised pre-training changed everything.

Each post should be 150-300 words, educational but conversational, Gabriel's voice (sharp, efficient, behind-the-scenes engineer), include relevant emojis, and end with a thought-provoking question or call-to-action.`;

        // Insert with explicit ID
        const captureRes = await client.query(
            'INSERT INTO "Capture" (id, raw_content, core_insight, source_type, status, post_worthy, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id',
            [nextId, rawContent, 'AI/ML evolution from LSTMs to Frontier APIs and Attention mechanisms.', 'note', 'curated', 1]
        );
        
        const prodCaptureId = captureRes.rows[0].id;
        console.log(`Created new Capture on Railway with ID: ${prodCaptureId}`);

        // 2. Load the drafts generated locally
        const drafts = JSON.parse(fs.readFileSync('drafts_to_migrate.json', 'utf8'));
        
        // 3. Get next available ID for Draft
        const maxDraftIdRes = await client.query('SELECT MAX(id) FROM "Draft"');
        let nextDraftId = (maxDraftIdRes.rows[0].max || 0) + 1;

        // 4. Insert them into Production "Draft" table
        for (const draft of drafts) {
            const query = `
                INSERT INTO "Draft" (id, capture_id, variant_type, content, status, review_notes, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW())
            `;
            const values = [
                nextDraftId++,
                prodCaptureId, 
                draft.variant_type,
                draft.content,
                draft.status,
                draft.review_notes
            ];
            
            await client.query(query, values);
            console.log(`Pushed ${draft.variant_type} variant to Railway`);
        }
        
        console.log('Migration complete. 15 drafts are now live in your app.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
