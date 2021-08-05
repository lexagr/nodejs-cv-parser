import { SequenceDTO } from '../dto/sequence.dto';
import { PaddingDTO } from '../utils/dto/padding.dto';
import { CVSection } from 'src/cv-parser/dto/cvsection.dto';

export interface Sequencer {
  do(paddings: PaddingDTO, cvSection: CVSection, fromIdx: number): SequenceDTO;
}
