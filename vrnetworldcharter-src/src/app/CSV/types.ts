export interface CSVFileRow {
    Datum: string;
    Valuta: string;
    Empfaenger_Name: string;
    Empfaenger_IBAN: string;
    Empfaenger_BIC: string;
    Verwendungszweck: string;
    Kategorie: string;
    Betrag: string;
    Waehrung: string;
    Ursprung: string;
}

export interface CSVIndexedRow { 
    index: number;
    data: CSVFileRow 
}
