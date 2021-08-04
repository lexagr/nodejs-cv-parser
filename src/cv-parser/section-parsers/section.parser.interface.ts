import { PDFExtractText } from 'pdf.js-extract';

import { CVSection } from '../dto/cvsection.dto';

export interface SectionParser {
  do(cvSection: CVSection, item: PDFExtractText);
}
