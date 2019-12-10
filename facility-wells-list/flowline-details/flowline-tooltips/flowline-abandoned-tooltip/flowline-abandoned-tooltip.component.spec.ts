import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowlineAbandonedTooltipComponent } from './flowline-abandoned-tooltip.component';

describe('FlowlineAbandonedTooltipComponent', () => {
  let component: FlowlineAbandonedTooltipComponent;
  let fixture: ComponentFixture<FlowlineAbandonedTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowlineAbandonedTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowlineAbandonedTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
