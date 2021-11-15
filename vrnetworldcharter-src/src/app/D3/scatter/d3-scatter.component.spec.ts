import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ScatterComponent } from './d3-scatter.component';

describe('D3ScatterComponent', () => {
  let component: D3ScatterComponent;
  let fixture: ComponentFixture<D3ScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3ScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
