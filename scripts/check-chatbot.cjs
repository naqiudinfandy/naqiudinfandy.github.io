/* Ujian regresi enjin pembantu: fakta projek, sempadan kata, bahasa dan konteks.
   node:assert/vm/fs ialah library terbina dalam Node; tiada dependency baharu. */
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../chatbot-knowledge.js'), 'utf8'), sandbox);
const knowledge = sandbox.window.PORTFOLIO_KNOWLEDGE;
const engine = sandbox.window.createPortfolioAssistant([
  ...knowledge,
  { id: 'greeting', kw: ['hi', 'hello'] },
  { id: 'skills', kw: ['skills', 'technology', 'technologies'] },
  { id: 'experience', kw: ['experience', 'pengalaman'] }
]);
let checks = 0;
/** Soalan bebas bermula tanpa konteks; setiap ID dijangka mesti hadir. */
function expect(question, expected) {
  engine.reset();
  const actual = Array.from(engine.resolve(question), i => i.id);
  assert.deepEqual(actual, expected, question);
  checks++;
}
expect('Tell me about Homestay Shimah Jay', ['homestay']);
expect('Apa teknologi projek homestay?', ['homestay']);
expect('Kambing Golek Melaka Official technology', ['kgom']);
expect('KGOM', ['kgom']);
expect('compare homestay and kambing golek', ['kgom', 'homestay']);
expect('homestay pricing and timeline', ['homestay', 'timeline', 'pricing']);
expect('brape harga website?', ['pricing']);
expect('sebut harga dan tempoh projek', ['pricing', 'timeline']);
expect('How long will a website take?', ['timeline']);
expect('What is your notice period?', ['hiring']);
expect('What full-time role suits him?', ['hiring']);
expect('Can you make an application?', ['applications']);
expect('show screenshots', ['design']);
expect('portfolio lama', ['versions']);
expect('maintenance and hosting', ['support']);
expect('SEO google ranking', ['seo']);
expect('民宿技术', ['homestay']);
expect('烤羊网站项目', ['kgom']);
expect('网站报价', ['pricing']);
expect('hi', ['greeting']);
expect('this shipping thing', []);
expect('applicationish', []);
expect('pineapple', []);
expect('unknown weather question', []);
engine.resolve('homestay');
assert.equal(engine.resolve('What technologies did you use?')[0].id, 'homestay'); checks++;
assert.equal(engine.resolve('boleh bagi gambar lagi?')[0].id, 'homestay'); checks++;
engine.resolve('kambing golek');
assert.equal(engine.resolve('more details')[0].id, 'kgom'); checks++;
engine.reset();
assert.equal(engine.resolve('technologies')[0].id, 'skills'); checks++;
engine.remember('homestay');
assert.equal(engine.resolve('features?')[0].id, 'homestay'); checks++;
for (const intent of knowledge) {
  for (const lang of ['en', 'ms', 'zh']) assert.ok(intent.a[lang]?.length > 30, `${intent.id}/${lang}`);
  checks++;
}
assert.match(knowledge.find(i => i.id === 'homestay').a.en, /eight/); checks++;
assert.doesNotMatch(knowledge.find(i => i.id === 'pricing').a.en, /RM\s*\d|\d+%/); checks++;
console.log(`${checks} chatbot checks passed.`);
