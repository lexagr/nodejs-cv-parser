import { PDFExtractText } from 'pdf.js-extract';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { SectionParser } from './section.parser.interface';

export class DefaultSectionParser implements SectionParser {
  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    cvSection.items.push(item.str);
  }

  finish(cvSection: CVSection) {}
}