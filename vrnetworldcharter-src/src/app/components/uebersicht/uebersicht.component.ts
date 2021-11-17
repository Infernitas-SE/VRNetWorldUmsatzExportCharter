import { Component, OnChanges } from '@angular/core'
import { ColDef } from 'ag-grid-community'
import { CSVDataService } from 'src/app/services/csv-data/csv-data.service'

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss'],
})
export class UebersichtComponent implements OnChanges {
  constructor(public csvDataSvc: CSVDataService) {}

  public rows: any

  ngOnChanges() {
    this.csvDataSvc.GetCSVPaket().subscribe(s => {
      this.rows = s.data
    })
  }

  columns: ColDef[] = [
    { field: 'Datum', headerName: 'Datum' },
    { field: 'Valuta', headerName: 'Valuta' },
    { field: 'Empfaenger_Name', headerName: '(E) Name' },
    { field: 'Empfaenger_IBAN', headerName: '(E) IBAN' },
    { field: 'Empfaenger_BIC', headerName: '(E) BIC' },
    { field: 'Verwendungszweck', headerName: 'Verwendungszweck' },
    { field: 'Kategorie', headerName: 'Kategorie' },
    { field: 'Betrag', headerName: 'Betrag' },
    { field: 'Waehrung', headerName: 'Währung' },
    { field: 'Ursprung', headerName: 'Ursprung' },
  ]
}
