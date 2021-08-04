import { CVSection } from './cvsection.dto';

export class CVPerson {
  public name: string;
  public sections: CVSection[] = [];
}
