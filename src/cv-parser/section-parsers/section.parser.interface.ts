import { PDFExtractText } from 'pdf.js-extract';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { Filter } from './filters/filter.interface';

export interface SectionParser {
  filters: Filter[];

  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText);
  finish(person: CVPerson, cvSection: CVSection);
}
