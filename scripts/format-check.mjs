// Formatting rules: two-space indent (no tabs), no trailing whitespace, one final newline.
import { readFileSync } from 'node:fs';
import { sourceFiles } from './files.mjs';

const problems = [];
for (const file of sourceFiles()) {
  const text = readFileSync(file, 'utf8');
  if (!text.endsWith('\n') || text.endsWith('\n\n')) problems.push(`${file}: must end with exactly one newline`);
  text.split('\n').forEach((line, i) => {
    if (/\t/.test(line)) problems.push(`${file}:${i + 1}: tab character`);
    if (/\s+$/.test(line)) problems.push(`${file}:${i + 1}: trailing whitespace`);
  });
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('format: ok');
