import { CVSection } from './cvsection.dto';

export class CVPerson {
  public name: string;
  public currentPosition: string;
  public currentLocation: string;
  public sections: CVSection[] = [];
}
