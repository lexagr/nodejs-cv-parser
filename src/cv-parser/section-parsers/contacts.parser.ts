import { PDFExtractText } from 'pdf.js-extract';
import { CVContact } from '../dto/cvcontact.dto';

import { CVSection } from '../dto/cvsection.dto';
import { SectionParser } from './section.parser.interface';

export class ContactsSectionParser implements SectionParser {
  private regex = /^\ *(?:\((.*)\)|(.*))/; // ' (LinkedIn)', '(LinkedIn)' etc (as item description)

  do(cvSection: CVSection, item: PDFExtractText) {
    let prevItem: CVContact = cvSection.items[cvSection.items.length - 1];
    let regexResult = null;

    if (prevItem && prevItem.data[prevItem.data.length - 1] === '-') {
      // text continue on new string
      prevItem.data = prevItem.data + item.str;
      cvSection.items[cvSection.items.length - 1] = prevItem;
    } else if (
      prevItem &&
      (regexResult = this.regex.exec(item.str)) &&
      regexResult[1]
    ) {
      // description detected
      prevItem.desc = regexResult[1].trim();
      cvSection.items[cvSection.items.length - 1] = prevItem;
    } else {
      const contactItem = new CVContact();
      contactItem.data = item.str;

      cvSection.items.push(contactItem);
    }
  }
}
