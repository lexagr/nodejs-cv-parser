import { PDFExtractText } from 'pdf.js-extract';

import { CVSection } from '../dto/cvsection.dto';
import { SectionParser } from './section.parser.interface';

export class DefaultSectionParser implements SectionParser {
  do(cvSection: CVSection, item: PDFExtractText) {
    cvSection.items.push(item.str);
  }
}
