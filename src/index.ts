import * as fs from 'fs';
import * as path from 'path';
import * as pdf from 'pdf-parse';

const bootstrap = () => {
  const filename = process.argv[2];
  const parsedPath = path.parse(filename);

  if (!filename || parsedPath.ext !== '.pdf') {
    console.log('Please specify the valid pdf file!');
    return;
  }

  let filePath = path.join(process.cwd(), 'storage/', parsedPath.base);
  console.log(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    pdf(data).then((result) => {
      console.log(result);
    });
  });
};

bootstrap();
