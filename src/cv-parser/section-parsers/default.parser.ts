import { PDFExtractText } from 'pdf.js-extract';

import { SectionParser } from './section.parser.interface';
import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { PaddingDTO } from './utils/dto/padding.dto';
import { SequenceDTO } from './dto/sequence.dto';

import { CVParserUtils } from './utils/utils';
import { Sequencer } from './sequencers/sequencer.interface';
import { DefaultArraySequencer } from './sequencers/default.array.sequencer';
import { Filter } from './filters/filter.interface';

export class DefaultSectionParser implements SectionParser {
  public filters: Filter[] = [];

  constructor(private sequencer: Sequencer = new DefaultArraySequencer()) {
    if (!sequencer) throw new Error('No provided sequencer');
  }

  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    cvSection.items.push([item.str, item.y]);
  }

  finish(person: CVPerson, cvSection: CVSection) {
    const itemsPadding = CVParserUtils.calculatePadding(cvSection);

    const itemsReconstruct = [];
    for (let curIdx = 0; curIdx < cvSection.items.length; curIdx++) {
      const seq = this.sequencer.do(itemsPadding, cvSection, curIdx);
      curIdx += seq.processedLines;

      for (const filter of this.filters) {
        seq.result = filter.do(seq.result);
      }

      seq.result = seq.result.trim();
      if (seq.result.length <= 0) {
        continue;
      }

      itemsReconstruct.push(seq.result);
    }

    cvSection.items = itemsReconstruct;
  }
}
