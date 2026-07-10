/**
 * ⚠️  DEPRECATED — This file has been replaced by compose-comic-strip.ts
 *
 * The old approach of compositing isolated character PNGs onto coded backgrounds
 * produced amateur-looking results. The new pipeline generates FULL SCENE panels
 * via Fal.ai LoRA (character + environment + props in one AI image), then only
 * overlays speech bubbles + text + panel assembly programmatically.
 *
 * New scripts:
 *   - scripts/generate-comic-panel.ts  → Generates full scene panel images via AI
 *   - scripts/compose-comic-strip.ts   → Assembles panels into strips (bubbles/borders only)
 *   - scripts/generate-full-comic.ts   → End-to-end pipeline (script → finished comic)
 *
 * Usage:
 *   npm run comic:generate -- --prompt "..." --output generated/panel.png
 *   npm run comic:strip -- --layout grid --panel1 ... --text1 ... --output comics/strip.png
 *   npm run comic:full -- --script comics/scripts/comic-001.md --output comics/final.png
 *
 * This file is kept temporarily for reference. Delete when comfortable with the new pipeline.
 */

console.error('❌ compose-comic-panel.ts is DEPRECATED.');
console.error('');
console.error('Use the new pipeline instead:');
console.error('  npm run comic:generate  → Generate full-scene panel images');
console.error('  npm run comic:strip     → Assemble panels into a strip');
console.error('  npm run comic:full      → End-to-end (script → finished comic)');
console.error('');
console.error('See scripts/compose-comic-strip.ts for the replacement.');
process.exit(1);
