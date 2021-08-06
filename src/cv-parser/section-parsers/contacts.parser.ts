import { PDFExtractPage, PDFExtractText } from 'pdf.js-extract';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { DefaultSectionParser } from './default.parser';

import config from '../config';

export class ContactsSectionParser extends DefaultSectionParser {
  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    super.do(person, cvSection, item);
  }

  finish(person: CVPerson, cvSection: CVSection) {
    super.finish(person, cvSection);

    const tmp = cvSection.items.join(' ');
    let phone = config.re.phone.exec(tmp);
    if (phone) {
      person.phone = phone[0];
    }
  }
}
