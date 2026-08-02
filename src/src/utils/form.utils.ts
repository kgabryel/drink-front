import errors from '@config/errors';
import { stringsService } from '@services/strings.service';

export const filterName = (value: string, query: string): boolean => stringsService.filterStrings(value, query);

export const passwordMath = (password: string, passwordRepeat: string): string[] => {
  if (password === '' || passwordRepeat === '') {
    return [];
  }
  if (password !== passwordRepeat) {
    return [errors.passwordDifferent];
  }

  return [];
};
