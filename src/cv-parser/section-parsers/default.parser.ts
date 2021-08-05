import { PDFExtractText } from 'pdf.js-extract';

import { SectionParser } from './section.parser.interface';
import { CVPerson } from '../dto/cvperson.dto';
import { CVSection } from '../dto/cvsection.dto';
import { PaddingDTO } from './utils/dto/padding.dto';
import { SequenceDTO } from './dto/sequence.dto';

import { CVParserUtils } from './utils/utils';
import { Sequencer } from './sequencers/sequencer.interface';
import { DefaultArraySequencer } from './sequencers/default.array.sequencer';

export class DefaultSectionParser implements SectionParser {
  constructor(private sequencer: Sequencer = new DefaultArraySequencer()) {
    if (!sequencer) throw 'No provided sequencer';
  }

  do(person: CVPerson, cvSection: CVSection, item: PDFExtractText) {
    cvSection.items.push([item.str, item.y]);
  }

  finish(person: CVPerson, cvSection: CVSection) {
    const itemsPadding = CVParserUtils.calculatePadding(cvSection);
    console.log(itemsPadding);

    const itemsReconstruct = [];
    for (let curIdx = 0; curIdx < cvSection.items.length; curIdx++) {
      const seq = this.sequencer.do(itemsPadding, cvSection, curIdx);
      curIdx += seq.processedLines;
      itemsReconstruct.push(seq.result);

      console.log('builded sequence:', seq);
    }

    console.log('itemsReconstruct', itemsReconstruct);
    cvSection.items = itemsReconstruct;
  }
}
