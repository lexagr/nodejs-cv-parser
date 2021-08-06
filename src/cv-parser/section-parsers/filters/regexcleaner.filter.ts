import { Filter } from './filter.interface';

export class RegexCleanerFilter implements Filter {
  constructor(private regex: RegExp) {}

  do(data: any): any {
    if (this.regex && typeof data === 'string') {
      return data.replaceAll(this.regex, '');
    }
    throw new Error('No provided regex');
  }
}
