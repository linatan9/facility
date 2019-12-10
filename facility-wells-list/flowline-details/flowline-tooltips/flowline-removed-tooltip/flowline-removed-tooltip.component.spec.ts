import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowlineRemovedTooltipComponent } from './flowline-removed-tooltip.component';

describe('FlowlineRemovedTooltipComponent', () => {
  let component: FlowlineRemovedTooltipComponent;
  let fixture: ComponentFixture<FlowlineRemovedTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowlineRemovedTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowlineRemovedTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
