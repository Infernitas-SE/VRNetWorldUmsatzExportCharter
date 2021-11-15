import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as d3f from './D3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public titleSvc: Title)
  {
    this.titleSvc.setTitle('VR-NetWorld Charter')
  }

  public config: d3f.D3Config = {
    margin: 50,
    width: 750 - (100),
    height: 400 - (100),
    data: [
      { name: "A", value: 25 },
      { name: "B", value: 50 },
      { name: "C", value: 75 },
      { name: "D", value: 100 }
    ],
    htmlSelector: 'first'
  };
}
