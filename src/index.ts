import * as fs from 'fs';
import * as path from 'path';

import { CVParser } from './cv-parser/cvparser';
import { ContactsProcessor } from './cv-parser/cvprocessors/contacts.processor';

const JSONDEF_DIR = 'jsondef/';
const STORAGE_DIR = 'storage/';

async function bootstrap() {
  const filename = process.argv[2];
  const parsedPath = path.parse(filename ?? '');

  if (!filename || parsedPath.ext !== '.pdf') {
    console.log('Please specify the valid pdf file!');
    return;
  }

  const jsondef = JSON.parse(
    fs
      .readFileSync(path.join(process.cwd(), JSONDEF_DIR, 'cvkeywords.json'))
      .toString(),
  );
  let filePath = path.join(process.cwd(), STORAGE_DIR, parsedPath.base);

  const parser = new CVParser(jsondef);
  parser.dataProcessors.push(new ContactsProcessor());

  const person = await parser.parse(filePath);

  console.log(JSON.stringify(person, null, 2));
}

bootstrap();
