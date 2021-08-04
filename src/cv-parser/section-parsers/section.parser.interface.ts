import { PDFExtractText } from 'pdf.js-extract';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';

export interface SectionParser {
  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText);
  finish(cvSection: CVSection);
}
