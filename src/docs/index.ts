import { readFileSync } from 'fs';
import { join } from 'path';

const mainReadme = readFileSync(
  join(__dirname, `..`, `..`, `README.md`),
  'utf8',
);

const erDrawio = readFileSync(join(__dirname, `er.drawio.svg`), 'utf8');

const demoDrawio = readFileSync(join(__dirname, `demo.drawio.svg`), 'utf8');

let mainDocs = mainReadme.replace(`erDrawio`, erDrawio);
mainDocs = mainDocs.replace(`demoDrawio`, demoDrawio);

export { mainDocs };
