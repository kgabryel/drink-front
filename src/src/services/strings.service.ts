interface StringService {
  clearPolishCharacters(text: string): string;
  compareString(a: string, b: string): number;
  filterStrings(a: string, b: string): boolean;
  stringIncludes(a: string, b: string): boolean;
}

export const stringsService: StringService = {
  clearPolishCharacters(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },
  compareString(a: string, b: string): number {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  },
  filterStrings(a: string, b: string): boolean {
    const normalizedA: string = stringsService.clearPolishCharacters(a.toLocaleLowerCase());
    const normalizedB: string = stringsService.clearPolishCharacters(b.toLocaleLowerCase());

    return normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA);
  },
  stringIncludes(a: string, b: string): boolean {
    return stringsService
      .clearPolishCharacters(a)
      .toLowerCase()
      .includes(stringsService.clearPolishCharacters(b).toLowerCase());
  },
};
