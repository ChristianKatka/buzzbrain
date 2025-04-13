// scripts/write-version.ts
import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

const main = async () => {
  const pkgPath = join(process.cwd(), 'package.json');
  const pkgContent = await readFile(pkgPath, 'utf-8');
  const { version } = JSON.parse(pkgContent);

  const versionFile = `export const APP_VERSION = '${version}';\n`;
  writeFileSync('src/environments/version.ts', versionFile);
  console.log('✔ App version set to:', version);
};

main();
