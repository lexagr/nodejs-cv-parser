import { PDFExtractText } from 'pdf.js-extract';

import { SectionParser } from './section.parser.interface';
import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { CVLanguage } from '../dto/cvlanguage.dto';

export class LanguagesSectionParser implements SectionParser {
  private regex = /^.*\ \((.*)\)/; // language level description

  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    let regexResult = null;
    if ((regexResult = this.regex.exec(item.str)) && regexResult[1]) {
      // let prevItem: string = cvSection.items[cvSection.items.length - 1];
      // prevItem = prevItem + item.str;

      let prevItem: CVLanguage = cvSection.items[cvSection.items.length - 1];
      prevItem.level = regexResult[1];

      cvSection.items[cvSection.items.length - 1] = prevItem;
    } else {
      const lang = new CVLanguage();
      lang.name = item.str;

      cvSection.items.push(lang);
    }
  }

  finish(person: CVPerson, cvSection: CVSection) {}
}
