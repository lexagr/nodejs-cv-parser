import { PDFExtractText } from 'pdf.js-extract';

import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { DefaultSectionParser } from './default.parser';
import { CVEducation } from '../dto/cveducation.dto';
import { DefaultArraySequencer } from './sequencers/default.array.sequencer';
import config from '../config';

export class EducationSectionParser extends DefaultSectionParser {
  private educations: CVEducation[] = [];
  private currentEducation: CVEducation = null;

  constructor() {
    super(new DefaultArraySequencer(true));
  }

  private tryFinishCurrentEducation(person: CVPerson, cvSection: CVSection) {
    if (this.currentEducation) {
      // build additional info sequence based on section items
      super.finish(person, cvSection);

      if (cvSection.items.length > 0) {
        for (let i = 0; i < cvSection.items.length; i++) {
          let regexResult = config.re.education_date_range.exec(
            cvSection.items[i],
          );

          if (regexResult && regexResult.length >= 3) {
            this.currentEducation.dateRange = [
              regexResult[1], // start date
              regexResult[2], // end date
            ];

            cvSection.items[i] = cvSection.items[i]
              .replaceAll(config.re.education_date_range, '')
              .trim();
          }
        }

        this.currentEducation.additionalInfo = cvSection.items.filter(
          (item) => item.length > 0,
        );
        cvSection.items = [];
      }

      if (this.currentEducation.name.trim().length > 0) {
        this.educations.push(this.currentEducation);
      }
    }
  }

  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    if (item.height == config.font_sizes.education_name) {
      // new education found
      this.tryFinishCurrentEducation(person, cvSection);

      this.currentEducation = new CVEducation();
      this.currentEducation.name = item.str;
    } else {
      // push element as additional info
      cvSection.items.push([item.str, item.y]);
    }
  }

  finish(person: CVPerson, cvSection: CVSection) {
    this.tryFinishCurrentEducation(person, cvSection);

    cvSection.items = this.educations;
  }
}
