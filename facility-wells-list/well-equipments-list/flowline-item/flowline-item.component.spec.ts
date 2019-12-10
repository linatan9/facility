import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowlineItemComponent } from './flowline-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FlowlineItemComponent', () => {
  let component: FlowlineItemComponent;
  let fixture: ComponentFixture<FlowlineItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowlineItemComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(FlowlineItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
