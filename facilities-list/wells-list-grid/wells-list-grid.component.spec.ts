import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellsListGridComponent } from './wells-list-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

class RouterStub {}

describe('WellsListGridComponent', () => {
  let component: WellsListGridComponent;
  let fixture: ComponentFixture<WellsListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellsListGridComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useClass: RouterStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellsListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
