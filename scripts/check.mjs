import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const html = readFileSync('index.html', 'utf8');
const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]).filter(path => !/^(https?:|mailto:|tel:)/.test(path));
for (const path of references) assert.ok(existsSync(path), `Arquivo ausente: ${path}`);
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `Âncora ausente: ${id}`);
assert.ok(!/<script(?![^>]*src=)[^>]*>\s*\S/.test(html), 'JavaScript inline');
assert.ok(!/\son(?:submit|change)=/.test(html), 'Evento inline');
const listeners = {};
let redirected;
let focused = false;
let services = [];
const count = {};
const form = {
  addEventListener: (name, callback) => listeners[name] = callback,
  querySelectorAll: () => services,
  querySelector: selector => selector.includes('deadline') ? { value: 'Normal (2 a 4 semanas)' } : { focus: () => focused = true }
};
vm.runInNewContext(readFileSync('assets/js/quote-form.js', 'utf8'), {
  document: { getElementById: id => id === 'calcForm' ? form : count },
  window: { SITE_CONFIG: { whatsappNumber: '5524988038079' }, location: { assign: value => redirected = value } },
  URL, alert: () => {}
});
listeners.submit({ preventDefault() {} });
assert.ok(focused && !redirected, 'Seleção vazia deve impedir envio');
services = [{ value: 'Identidade Visual / Logo' }, { value: 'Artes & criação' }];
listeners.change();
assert.equal(count.textContent, '2 serviços');
listeners.submit({ preventDefault() {} });
const url = new URL(redirected);
assert.equal(url.pathname, '/5524988038079');
assert.ok(url.searchParams.get('text').includes('• Artes & criação\n'));
assert.ok(url.searchParams.get('text').includes('Normal (2 a 4 semanas)'));
console.log('Referências locais, âncoras e formulário WhatsApp verificados.');
