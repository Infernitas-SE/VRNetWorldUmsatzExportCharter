import { Component, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { SplittedCSVIndexedArray, ArrayRange } from './CSV'
import { CSVDataService } from './services/csv-data/csv-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public titleSvc: Title, public csvDataSvc: CSVDataService) {
    this.titleSvc.setTitle('VR-NetWorld Charter')
    this.csvDataSvc
      .GetAuswertungModus()
      .subscribe((s) => (this.auswertungAktiv = s))
  }
  /*
  public barConfig: d3f.D3Config = {
    margin: 50,
    width: 650,
    height: 300,
    data: [
      { name: "A", value: 25 },
      { name: "B", value: 50 },
      { name: "C", value: 75 },
      { name: "D", value: 100 }
    ],
    htmlSelector: 'first'
  };

  public pieConfig: d3f.D3PieConfig = {
    margin: 50,
    width: 650,
    height: 300,
    data: [
      { name: "A", value: 25 },
      { name: "B", value: 50 },
      { name: "C", value: 75 },
      { name: "D", value: 100 }
    ],
    htmlSelector: 'first',
    radius: Math.min(650, 300) / 2 - 50
  }*/

  public uploadForm = new FormGroup({
    file: new FormControl(),
    paketGroeße: new FormControl(),
  })

  /*
   * Variablen
   */
  auswertungAktiv: boolean = false
  paketSizes: ArrayRange[] = []

  /*
   * Input Handler
   */
  public HandleFileSubmit = () => {
    this.csvDataSvc.UploadCSVDatei()
    this.csvDataSvc.ParseCSVDatei()
  }
  public HandleSelectPaket = (event) =>
    this.csvDataSvc.SelectCSVPaket(event.target.value)
  public HandleFileInputUpdate = (event) =>
    this.csvDataSvc.SetCSVDatei(event.target.files.item(0))

  /*
   * GET/SET Methoden in verbindung mit CSVDataService
   */
  public SetPaketSize = (event) =>
    this.csvDataSvc.SetPaketSize(event.target.value)
  public GetPaketSize = () =>
    this.csvDataSvc
      .GetPaketSize()
      .subscribe((s) => s)
      .unsubscribe()
  public GetPaketRangeList = (): ArrayRange[] => {
    var ranges: ArrayRange[] = []
    this.csvDataSvc
      .GetCSVPakete()
      .subscribe((s) => {
        ranges = s.map((s) => s.range)
      })
      .unsubscribe()
    return ranges
  }
}
