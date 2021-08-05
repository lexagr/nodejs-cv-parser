import { CVSection } from '../../dto/cvsection.dto';
import { PaddingDTO } from './dto/padding.dto';

export class CVParserUtils {
  static calculatePadding(cvSection: CVSection): PaddingDTO {
    let prevPositionY: number = null;

    let biggestPadding: number = Number.MIN_VALUE;
    let smallerPadding: number = Number.MAX_VALUE;

    // search smaller padding
    for (let item of cvSection.items) {
      if (prevPositionY === null) {
        prevPositionY = item[1];
        continue;
      }

      let possiblePadding = item[1] - prevPositionY;
      if (possiblePadding > 0.0 && smallerPadding > possiblePadding) {
        smallerPadding = possiblePadding;
      }

      prevPositionY = item[1];
    }

    // search biggest padding
    prevPositionY = null;
    for (let item of cvSection.items) {
      if (prevPositionY === null) {
        prevPositionY = item[1];
        continue;
      }

      let possiblePadding = item[1] - prevPositionY;
      if (biggestPadding < possiblePadding) {
        biggestPadding = possiblePadding;
      }

      if (biggestPadding > smallerPadding) {
        break;
      }

      prevPositionY = item[1];
    }

    const paddingDTO = new PaddingDTO();
    paddingDTO.smallerPadding = Math.round(smallerPadding);
    paddingDTO.biggestPadding = Math.round(biggestPadding);

    return paddingDTO;
  }
}
