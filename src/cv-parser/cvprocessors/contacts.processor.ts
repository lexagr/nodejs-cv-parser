import { PDFExtractPage } from 'pdf.js-extract';
import { URL } from 'url';
import config from '../config';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { CVProcessor } from './cvprocessor.interface';

export class ContactsProcessor implements CVProcessor {
  do(pages: PDFExtractPage[], person: CVPerson) {
    for (let page of pages) {
      // process links
      for (let item of page.links) {
        // email
        if (item.startsWith('mailto:')) {
          if (!person.email) {
            person.email = item.replace('mailto:', '');
          }
          continue;
        }

        // remove query string from link
        const url = new URL(item);

        // profiles
        if (item.match(config.re.profiles)) {
          if (!person.profiles) {
            person.profiles = [];
          }

          url.search = '';
          person.profiles.push(url.toString());
        } else {
          if (!person.links) {
            person.links = [];
          }
          person.links.push(url.toString());
        }
      }
    }

    for (const sectionName in person.sections) {
      const section: [] = person.sections[sectionName];

      for (const item of section) {
        if (typeof item !== 'string') continue;

        if (!person.email) {
          let regexResult = config.re.email.exec(item);
          if (regexResult && regexResult[1]) {
            person.email = regexResult[1];
          }
        }

        if (!person.phone) {
          let regexResult = config.re.phone.exec(item);
          if (regexResult && regexResult[1]) {
            person.phone = regexResult[1];
          }
        }

        if (!person.skype) {
          let regexResult = config.re.skype_live.exec(item);
          if (regexResult && regexResult[1]) {
            person.skype = regexResult[1];
          }
        }
      }
    }

    // remove duplications
    if (person.profiles) person.profiles = Array.from(new Set(person.profiles));
    if (person.links) person.links = Array.from(new Set(person.links));
  }
}
