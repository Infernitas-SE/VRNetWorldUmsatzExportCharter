import { Injectable } from '@angular/core'
import { merge } from 'd3-array'
import { BehaviorSubject, EMPTY, mergeMap, Observable, from as fromPromise, ObservableInput } from 'rxjs'
import {
  CSVIndexedRow,
  SplittedCSVIndexedArray,
  ArrayRange,
  MapStringToCSV,
  AddToCSVRow,
  CSVRow
} from 'src/app/CSV'
import { GetAllPropertiesFromClass } from 'src/app/util'

@Injectable({
  providedIn: 'root',
})
export class CSVDataService {
  constructor() {}

  /*
   * Variablen für Datenspeicher
   */
  private auswertungAktiv = new BehaviorSubject<boolean>(false)
  public csvDatei = new BehaviorSubject<any>(EMPTY)
  public csvRows = new BehaviorSubject<CSVIndexedRow[]>([])
  private csvPakete = new BehaviorSubject<SplittedCSVIndexedArray[]>([])
  private csvPaket = new BehaviorSubject<SplittedCSVIndexedArray>({
    range: '0-0',
    data: [],
    index: 0,
  })
  private rangeSelect = new BehaviorSubject<ArrayRange>('0-0')
  private rangeSelections = new BehaviorSubject<ArrayRange[]>([])
  private csvPaketSize = new BehaviorSubject<number>(0)

  /*
   * Standard GET/SET Funktionen
   */
  public GetAuswertungModus = () => this.auswertungAktiv.asObservable()
  public GetCSVDatei = () => this.csvDatei.asObservable()
  public GetCSVRows = () => { 
    console.log('GetCSVRows')
    return this.csvRows.asObservable()
  }
  public GetCSVPakete = () => this.csvPakete.asObservable()
  public GetCSVPaket = () => this.csvPaket.asObservable()
  public GetRangeSelection = () => this.rangeSelect.asObservable()
  public GetRangeSelections = () => this.rangeSelections.asObservable()
  public GetPaketSize = () => { 
    console.log('GetPaketSize')
    return this.csvPaketSize.asObservable()
  }

  public SetAuswertungModus = (value: boolean) => {
    this.auswertungAktiv.next(value)
    this.auswertungAktiv.complete()
  }
  public SetCSVDatei = (value: any) => {
    this.csvDatei.next(value)
    this.csvPaket.complete()
  }
  public SetCSVRows = (value: CSVIndexedRow[]) => {
    this.csvRows.next(value)
    this.csvRows.complete()
  }
  public SetCSVPakete = (value: SplittedCSVIndexedArray[]) => {
    this.csvPakete.next(value)
    this.csvPakete.complete()
  }
  public SetCSVPaket = (value: SplittedCSVIndexedArray) => {
    this.csvPaket.next(value)
    this.csvPaket.complete()
  }
  public SetRangeSelection = (value: ArrayRange) => {
    this.rangeSelect.next(value)
    this.rangeSelect.complete()
  }
  public SetPaketSize = (value: number) => {
    this.csvPaketSize.next(value)
    this.csvPaketSize.complete()
  }

  /*
   * Spezialisierte Select Methoden
   */
  public SelectCSVPaket = (range: ArrayRange) => {
    this.csvPakete
      .subscribe((s) => {
        var paket = s.find((paket) => paket.range === range)
        if (paket !== undefined) {
          this.csvPaket.next(paket)
          this.csvPaket.complete()
        }
      })
      .unsubscribe()
  }

  /*
   * Spezialisierte Upload Methoden
   */
  public UploadCSVDatei = () => {
    var fileReader = new FileReader()
    fileReader.onload = (e) => {
      var rows: string[] = fileReader.result?.toString().split(/\r\n/g) ?? []
      if (rows === []) {
        console.log('Datei konnte nicht korrekt eingelesen werden!')
      }
      var data: CSVIndexedRow[] = []
      rows.forEach((r) => {
        var row = MapStringToCSV(r)
        data = AddToCSVRow(data, row)
      })
      data.splice(0, 1)
      this.SetCSVRows(data)
      this.SetAuswertungModus(true)
    }
    this.GetCSVDatei()
      .subscribe((s) => {
        fileReader.readAsText(s, 'UTF-8')
      })
      .unsubscribe()
  }

  /*
   * Spezialisierte Parser Methoden
   */
  public ParseCSVDatei = () => {
    this.GetPaketSize().subscribe(size => {
      console.log(size)
      this.GetCSVRows().subscribe(rows => {
        console.log(rows)
      })
    })
  }
}
