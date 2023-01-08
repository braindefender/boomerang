// pattern, primary, secondary, [alternative]
export enum DictionaryIndex {
  PATTERN = 0,
  PRIMARY,
  SECONDARY,
  ALTERNATIVE,
}

export const ALT = "⎇";

export const dictionary = [
  ["1000", "Е", "Т", "Ё"],
  ["0100", "О", "В", "Ф"],
  ["0010", "А", "Л", "Э"],
  ["0001", "И", "У", "Ъ"],

  ["1100", "Н", "М"],
  ["0110", "С", "Ь"],
  ["0011", "Д", "Ч"],
  ["1010", "Я", "Ж"],
  ["0101", "Й", "З"],
  ["1001", "Б", ALT],

  ["1110", "Р", "К"],
  ["0111", "Ы", "Х"],
  ["1011", "Ц", "Щ"],
  ["1101", "Ю", "Ш"],

  ["1111", "П", "Г"],
];