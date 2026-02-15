const Database = require('/home/openclaw/.openclaw/workspace/antfarm/node_modules/better-sqlite3');
const path = require('path');
const os = require('os');

const dbPath = path.join(os.homedir(), '.openclaw/antfarm/content_pipeline.db');
const db = new Database(dbPath);

// Review notes for each draft
const reviews = [
  // Capture 1 - Voice onboarding
  {
    id: 44,
    notes: "VOICE COMPLIANCE: ✅ Strong. Sharp, direct, good technical depth. The '15x' framing is punchy. The mechanics section explains without fluff. Minor: 'What part of your product...' ending is slightly generic advisor-voice—could be more specific to Gabriel's actual work."
  },
  {
    id: 45,
    notes: "VOICE COMPLIANCE: ✅ Strong. Contrarian angle works well. 'Not 15%. 15x.' is exactly the sharp voice Gabriel wants. 'Who's actually building...' closing is solid. No hustle vibes, good technical confidence."
  },
  {
    id: 46,
    notes: "VOICE COMPLIANCE: ✅ Strong behind-the-scenes authenticity. Shows the thinking process, admits the 'crazy idea' framing. Ending insight about reimagining vs improving is memorable. Good balance of educational + personal story."
  },
  // Capture 2 - 15x pattern
  {
    id: 47,
    notes: "VOICE COMPLIANCE: ✅ Very strong. Pattern-based teaching is Gabriel's sweet spot. 'Friction × AI = Acceleration' is a keeper line. The 4-step breakdown is genuinely educational without being preachy. Good technical depth."
  },
  {
    id: 48,
    notes: "VOICE COMPLIANCE: ✅ Strong hot-take energy. 'pretending it's fine' is sharp. Critique of company-centric vs user-centric design is on-brand. No buzzwords, solid contrarian insight."
  },
  {
    id: 49,
    notes: "VOICE COMPLIANCE: ✅ Strong behind-the-scenes. The 'impossible just means I haven't tried aggressively scoped yet' line is pure Gabriel—self-aware, technically grounded, slightly irreverent. Shows constraints well."
  },
  // Capture 3 - Why voice now
  {
    id: 50,
    notes: "VOICE COMPLIANCE: ✅ Good technical breakdown. Stack and flow sections are clear. 'meet users where they already are: talking' is solid. Slightly more formal than other variants but still sharp."
  },
  {
    id: 51,
    notes: "VOICE COMPLIANCE: ✅ Strong hot-take. 'You haven't tried' is direct, no fluff. Critique of cultural resistance vs technical resistance is insightful. 'Users don't want better dashboards' is punchy."
  },
  {
    id: 52,
    notes: "VOICE COMPLIANCE: ✅ Strong behind-the-scenes. Personal reflection on good vs bad UX feels authentic. 'Good UX isn't about better interfaces...' insight is memorable. Good vulnerability without being overly emotional."
  },
  // Capture 5 - Signal Hunter
  {
    id: 53,
    notes: "VOICE COMPLIANCE: ⚠️ NEEDS ATTENTION. Leans slightly sales-y. 'One signal > 100 cold emails' feels like generic marketing wisdom. 'Listen and respond' / 'Spray and pray' comparisons are a bit pat. Consider cutting the 'The shift:' line which sounds like consultant-speak. Technical mechanics section is good—lean into that more."
  },
  {
    id: 54,
    notes: "VOICE COMPLIANCE: ⚠️ NEEDS ATTENTION. Opening is strong but 'flips the script' and 'killed it' are borderline hustle-culture phrases. 'Intent data isn't the future...' closing sounds like a vendor pitch. Gabriel should either cut the marketing-speak or make it more self-aware/ironic. The core signal-based insight is good—delivery needs sharpening."
  },
  {
    id: 55,
    notes: "VOICE COMPLIANCE: ✅ Good. 'I got tired of guessing' is authentic opener. Shows the origin story well. The insight about listening vs hunting is on-brand. Slightly cleaner/more polished than Gabriel's usual 'imperfections welcome' style but not off-brand."
  },
  // Capture 6 - AI enablement
  {
    id: 56,
    notes: "VOICE COMPLIANCE: ✅ Good. Pattern explanation is solid. 'making yourself obsolete (in a good way)' is slightly performative for a headline but the content delivers. Concrete examples (Replit, reverse proxy, Clay) show real work. The metric framing is insightful."
  },
  {
    id: 57,
    notes: "VOICE COMPLIANCE: ⚠️ BORDERLINE. Opening line 'Stop calling yourself...' is sharp, but 'the old game' / 'the new game' framing feels slightly startup-bro. '10x' / '100x' multipliers are cliché (hustle culture residue). The democratization point is good but the delivery sounds like every other 'AI changes everything' thread. Gabriel might want to cut the game metaphor and keep the infrastructure insight."
  },
  {
    id: 58,
    notes: "VOICE COMPLIANCE: ✅ Strong behind-the-scenes. 'I was terrified' shows vulnerability without being performative. Focus on enabling others vs being the hero is on-brand. 'My job isn't to be the best builder...' is a sharp, self-aware line. Good authentic voice throughout."
  }
];

// Update each draft with review notes
const updateStmt = db.prepare("UPDATE drafts SET review_notes = ?, updated_at = datetime('now') WHERE id = ?");

let updatedCount = 0;
for (const review of reviews) {
  updateStmt.run(review.notes, review.id);
  updatedCount++;
}

console.log('Updated ' + updatedCount + ' drafts with review notes');

// Get capture groups summary
const groups = db.prepare("SELECT capture_id, COUNT(*) as count FROM drafts WHERE status='pending_review' GROUP BY capture_id").all();
console.log('Capture groups ready for manual review: ' + groups.map(g => g.capture_id).join(', '));

db.close();
