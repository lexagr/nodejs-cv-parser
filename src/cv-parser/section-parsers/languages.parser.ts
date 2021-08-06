import { PDFExtractText } from 'pdf.js-extract';

import { SectionParser } from './section.parser.interface';
import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { CVLanguage } from '../dto/cvlanguage.dto';
import { DefaultSectionParser } from './default.parser';
import config from '../config';

export class LanguagesSectionParser extends DefaultSectionParser {
  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    super.do(person, cvSection, item);
  }

  finish(person: CVPerson, cvSection: CVSection) {
    super.finish(person, cvSection);

    const transformedItems = [];

    let regexResult = null;
    for (let i = 0; i < cvSection.items.length; i++) {
      if (
        (regexResult = config.re.languages.exec(cvSection.items[i])) &&
        regexResult[1]
      ) {
        const lang = new CVLanguage();
        lang.name = regexResult[1];

        if (regexResult[2]) {
          lang.level = regexResult[2];
        }

        transformedItems.push(lang);
      }
    }

    cvSection.items = transformedItems;
  }
}
