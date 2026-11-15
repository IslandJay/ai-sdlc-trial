import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Source files checked by lint and format: .js and .mjs under src, tests and scripts. */
export function sourceFiles(dirs = ['src', 'tests', 'scripts']) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.m?js$/.test(name)) out.push(p);
    }
  };
  for (const d of dirs) walk(d);
  return out.sort();
}
