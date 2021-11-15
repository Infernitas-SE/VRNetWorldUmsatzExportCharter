import { CSVIndexedRow } from '.'
import { CSVRow } from './types'

export function MapStringToCSV(row: string, sep: string = ';'): CSVRow {
  var rd = row.split(sep)
  var data: CSVRow = {
    Datum: rd[0],
    Valuta: rd[1],
    Empfaenger_Name: rd[2],
    Empfaenger_IBAN: rd[3],
    Empfaenger_BIC: rd[4],
    Verwendungszweck: rd[5],
    Kategorie: rd[6],
    Betrag: rd[7],
    Waehrung: rd[8],
    Ursprung: rd[9],
  }
  return data
}

export function AddToCSVRow(
  base: CSVIndexedRow[],
  row: CSVRow
): CSVIndexedRow[] {
  var length = base.length
  base.push({
    index: length++,
    data: row,
  })
  return base
}
