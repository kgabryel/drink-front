export interface SelectOption<T> {
  text: string;
  value: T;
}

export const availableOptions: SelectOption<boolean | null>[] = [
  { text: '-', value: null },
  { text: 'Tak', value: true },
  { text: 'Nie', value: false },
];
