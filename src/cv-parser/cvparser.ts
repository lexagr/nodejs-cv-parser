import { PDFExtract, PDFExtractResult } from 'pdf.js-extract';
import * as path from 'path';
import * as fs from 'fs';

import { SectionDefinition } from './schema/section_definition.schema';

import { CVPerson } from './dto/cvperson.dto';
import { CVSection } from './dto/cvsection.dto';

import { SectionParser } from './section-parsers/section.parser.interface';
import { DefaultSectionParser } from './section-parsers/default.parser';
import { ContactsSectionParser } from './section-parsers/contacts.parser';
import { LanguagesSectionParser } from './section-parsers/languages.parser';
import { ProfileSectionParser } from './section-parsers/profile.parser';
import { CVProcessor } from './cvprocessors/cvprocessor.interface';

export class CVParser {
  public dataProcessors: CVProcessor[] = [];

  constructor(private readonly jsonSectionDefinitions: SectionDefinition[]) {}

  private extractSectionTypeFromString(content): string {
    content = content.toLowerCase();

    for (let item of this.jsonSectionDefinitions) {
      for (let keyword of item.keywords) {
        if (keyword.toLowerCase() === content) {
          return item.type;
        }
      }
    }

    return null;
  }

  private async extractDataFromPDF(
    filePath: string,
  ): Promise<PDFExtractResult> {
    try {
      const pdfExtractor = new PDFExtract();
      return await pdfExtractor.extract(filePath);
    } catch (e) {
      console.error(e);
    }
  }

  async parse(filePath: string): Promise<CVPerson> {
    const pdfData = await this.extractDataFromPDF(filePath);

    let generatedPerson: CVPerson = new CVPerson();

    let currentSection: CVSection = null;
    let currentSectionParser: SectionParser = null;

    for (const page of pdfData.pages) {
      for (const item of page.content) {
        // skip only whitespaces
        if (item.str == ' ') continue;

        // parse section
        let possibleSection = this.extractSectionTypeFromString(item.str);
        if (item.height == 26) {
          possibleSection = 'profile';
        }

        // new section detected, if possibleSection not null
        if (possibleSection) {
          if (currentSection) {
            currentSectionParser.finish(generatedPerson, currentSection);

            if (!currentSection.dontInject) {
              generatedPerson.sections[currentSection.type] =
                currentSection.items;
            }
          }

          currentSection = new CVSection(possibleSection, []);
          switch (possibleSection) {
            case 'contacts': {
              currentSectionParser = new ContactsSectionParser();
              currentSection.dontInject = true;
              break;
            }
            case 'profile': {
              currentSectionParser = new ProfileSectionParser();
              generatedPerson.name = item.str.trim();
              break;
            }
            case 'languages': {
              currentSectionParser = new LanguagesSectionParser();
              break;
            }
            default: {
              currentSectionParser = new DefaultSectionParser();
              break;
            }
          }
        } else if (currentSection) {
          // not the section
          currentSectionParser.do(generatedPerson, currentSection, item);
        }
      }
    }

    for (const processor of this.dataProcessors) {
      processor.do(pdfData.pages, generatedPerson);
    }

    return generatedPerson;
  }
}
