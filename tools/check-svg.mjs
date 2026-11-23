/** Kiểm tra tính hợp lệ XML cơ bản của các file SVG trong public/images. */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || 'public/images';
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.svg')) files.push(full);
  }
}

walk(root);

let problems = 0;

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  // Bỏ XML comment trước khi kiểm tra (dấu & bên trong comment là hợp lệ)
  const text = raw.replace(/<!--[\s\S]*?-->/g, '');
  const issues = [];

  const stray = text.match(/<\/(h[1-6]|div|span|p|body|html)>/gi);
  if (stray) issues.push(`thẻ HTML lạc: ${stray.join(', ')}`);

  const badAmp = text.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g);
  if (badAmp) issues.push(`${badAmp.length} dấu & chưa escape`);

  for (const tag of text.match(/<[^>]*>/g) || []) {
    const quotes = (tag.match(/"/g) || []).length;
    if (quotes % 2 !== 0) {
      issues.push(`thẻ thiếu dấu nháy: ${tag.slice(0, 80)}`);
      break;
    }
  }

  const stack = [];
  for (const m of text.matchAll(/<\/?([a-zA-Z][\w:-]*)([^>]*)>/g)) {
    const raw = m[0];
    const name = m[1];
    if (raw.startsWith('</')) {
      const top = stack.pop();
      if (top !== name) issues.push(`đóng sai thẻ </${name}> (đang mở <${top}>)`);
    } else if (!raw.endsWith('/>')) {
      stack.push(name);
    }
  }
  if (stack.length) issues.push(`thẻ chưa đóng: ${stack.join(', ')}`);

  if (issues.length) {
    problems++;
    console.log(`❌ ${file}`);
    issues.forEach((i) => console.log(`     • ${i}`));
  }
}

console.log(`\nĐã quét ${files.length} file SVG — ${problems} file có vấn đề.`);
process.exit(problems === 0 ? 0 : 1);
