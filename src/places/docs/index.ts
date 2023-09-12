import { readFileSync } from 'fs';
import { join } from 'path';

const placesReadme = readFileSync(join(__dirname, `places.md`), 'utf8');

let placesDocs = placesReadme;

export { placesDocs };
