class StringsService {
    clearPolishCharacters(text) {
        const find = ['ą', 'ę', 'ć', 'ż', 'ź', 'ó', 'ł', 'ń', 'ś', 'Ą', 'Ę', 'Ć', 'Ż', 'Ź', 'Ó', 'Ł', 'Ń', 'Ś'];
        const replace = ['a', 'e', 'c', 'z', 'z', 'o', 'l', 'n', 's', 'A', 'E', 'C', 'Z', 'Z', 'O', 'L', 'N', 'S'];
        for (let i = 0; i < find.length; i++) {
            text = text.replace(find[i], replace[i]);
        }
        return text;
    }

    stringIncludes(a, b) {
        return stringsService.clearPolishCharacters(a).toLowerCase()
            .includes(stringsService.clearPolishCharacters(b).toLowerCase());
    }

    compareString(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }

    filterStrings(a, b) {
        return stringsService.clearPolishCharacters(a.toLocaleLowerCase())
                .indexOf(stringsService.clearPolishCharacters(b.toLocaleLowerCase())) > -1
            ||
            stringsService.clearPolishCharacters(a.toLocaleLowerCase())
                .indexOf(stringsService.clearPolishCharacters(b.toLocaleLowerCase())) > -1;
    }
}

export const stringsService = new StringsService();