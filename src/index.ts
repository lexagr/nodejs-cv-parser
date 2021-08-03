import * as fs from 'fs';
import * as path from 'path';
import { PDFExtract } from 'pdf.js-extract';

const bootstrap = () => {
  const filename = process.argv[2];
  const parsedPath = path.parse(filename ?? '');

  if (!filename || parsedPath.ext !== '.pdf') {
    console.log('Please specify the valid pdf file!');
    return;
  }

  let filePath = path.join(process.cwd(), 'storage/', parsedPath.base);

  const pdfExtractor = new PDFExtract();
  pdfExtractor.extract(filePath).then((data) => console.log(data.pages[0]));

  console.log(filePath);
};

bootstrap();
