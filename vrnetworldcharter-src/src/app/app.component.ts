import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import CSVParser from './CSV/parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public titleSvc: Title)
  {
    this.titleSvc.setTitle('VR-NetWorld Charter')
    this.csvHandler = new CSVParser();
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

  csvFile: any;
  csvHandler: CSVParser;

  public uploadForm = new FormGroup({
    file: new FormControl()
  });

  public handleFile(event) {
    this.csvFile = event.target.files.item(0);
  }

  public uploadFile() {
    let fileReader = new FileReader();
    const _ = this;
    fileReader.onload = function(e){
      _.csvHandler.Load(fileReader.result);
      _.csvHandler.Parse();
      _.csvHandler.CutHeader();
      _.csvHandler.Dump();
    }
    fileReader.readAsText(this.csvFile);
  }
}
