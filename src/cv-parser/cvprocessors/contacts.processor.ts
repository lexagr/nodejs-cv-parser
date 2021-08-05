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

          // remove query string
          const url = new URL(item);
          url.search = '';

          person.profiles.push(url.toString());
        }
      }
    }

    // remove duplications
    if (person.profiles) {
      person.profiles = Array.from(new Set(person.profiles));
    }
  }
}
