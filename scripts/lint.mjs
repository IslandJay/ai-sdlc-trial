// Syntax-check every source file with node --check.
import { execFileSync } from 'node:child_process';
import { sourceFiles } from './files.mjs';

let failed = 0;
for (const file of sourceFiles()) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    failed++;
    process.stderr.write(`${file}: ${err.stderr}`);
  }
}
if (failed) process.exit(1);
console.log('lint: ok');
