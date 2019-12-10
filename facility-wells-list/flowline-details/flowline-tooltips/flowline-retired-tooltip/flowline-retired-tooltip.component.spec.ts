import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowlineRetiredTooltipComponent } from './flowline-retired-tooltip.component';

describe('FlowlineRetiredTooltipComponent', () => {
  let component: FlowlineRetiredTooltipComponent;
  let fixture: ComponentFixture<FlowlineRetiredTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowlineRetiredTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowlineRetiredTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
