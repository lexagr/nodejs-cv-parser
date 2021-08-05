import { PDFExtractPage } from 'pdf.js-extract';
import config from '../config';

import { CVPerson } from '../dto/cvperson.dto';
import { CVProcessor } from './cvprocessor.interface';

export class ContactsProcessor implements CVProcessor {
  do(pages: PDFExtractPage[], person: CVPerson) {
    for (let page of pages) {
      // process links
      for (let item of page.links) {
        // email
        if (!person.email && item.startsWith('mailto:')) {
          person.email = item.replace('mailto:', '');
          continue;
        }

        // profiles
        if (item.match(config.re.profiles)) {
          if (!person.profiles) {
            person.profiles = [];
          }

          person.profiles.push(item);
        }
      }
    }
  }
}
