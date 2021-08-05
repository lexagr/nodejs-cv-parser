import { Enumerable } from '../../decorators/enumerable.decorator';

export class CVSection {
  public dontInject?: boolean;

  constructor(public type: string, public items: any[]) {}
}
