import { PDFExtractPage } from 'pdf.js-extract';
import { CVPerson } from '../dto/cvperson.dto';

export interface CVProcessor {
  do(pages: PDFExtractPage[], person: CVPerson);
}
