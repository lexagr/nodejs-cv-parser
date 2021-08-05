import { CVSection } from './cvsection.dto';

export class CVPerson {
  public name: string;
  public email?: string;
  public phone?: string;
  public profiles?: string[];
  public links?: string[];

  public sections: object = {};
}
