import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { CVParser } from './cv-parser/cvparser';
import { ContactsProcessor } from './cv-parser/cvprocessors/contacts.processor';

const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

const JSONDEF_DIR = 'jsondef/';
const STORAGE_DIR = 'storage/';
const EXAMPLE_DIR = 'example/';

async function bootstrap() {
  console.log('cwd', process.cwd());

  const jsondef = JSON.parse(
    fs
      .readFileSync(path.join(process.cwd(), JSONDEF_DIR, 'cvkeywords.json'))
      .toString(),
  );
  const storage_path = path.join(process.cwd(), STORAGE_DIR);
  const example_path = path.join(process.cwd(), EXAMPLE_DIR);

  const parser = new CVParser(jsondef);
  parser.dataProcessors.push(new ContactsProcessor());

  readdir(storage_path).then((items) => {
    for (const item of items) {
      const itemPath = path.parse(item);
      if (itemPath.ext != '.pdf') continue;

      const filePath = path.join(storage_path, itemPath.base);
      const examplePath = path.join(example_path, `${itemPath.name}.json`);

      parser.parse(filePath).then((person) => {
        writeFile(examplePath, JSON.stringify(person, null, 2));
      });
    }
  });
}
bootstrap();
