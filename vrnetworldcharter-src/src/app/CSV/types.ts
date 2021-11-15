export interface CSVRow {
  Datum: string
  Valuta: string
  Empfaenger_Name: string
  Empfaenger_IBAN: string
  Empfaenger_BIC: string
  Verwendungszweck: string
  Kategorie: string
  Betrag: string
  Waehrung: string
  Ursprung: string
}

export type SortByOptions =
  | 'Datum'
  | 'Valuta'
  | 'Empfaenger_Name'
  | 'IBAN'
  | 'BIC'
  | 'Verwendungszweck'
  | 'Kategorie'
  | 'Betrag'
  | 'Waehrung'
  | 'Ursprung'

export type ArrayRange = `${number}-${number}`;

export class SplittedCSVIndexedArray {
  public range?: ArrayRange;
  public data?: CSVIndexedRow[];
  
  public constructor(
    range?: ArrayRange,
    data?: CSVIndexedRow[]
  ) {
    this.range = range;
    this.data = data;
  }
}

export class CSVIndexedRow {
  public index?: number;
  public data?: CSVRow;

  public constructor(
    index?: number,
    data?: CSVRow
  ) {
    this.index = index;
    this.data = data;
  }
}

/* export interface SplittedCSVIndexedArray {
  range: ArrayRange;
  data: CSVIndexedRow[]
} */

/* export interface CSVIndexedRow {
  index: number
  data: CSVFileRow
}
 */

