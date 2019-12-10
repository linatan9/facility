import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'pna-ui-facility-column-decoration',
  templateUrl: './facility-column-decoration.component.html',
  styleUrls: ['./facility-column-decoration.component.scss']
})
export class FacilityColumnDecorationComponent {
  public config: PerfectScrollbarConfigInterface = {};
}
