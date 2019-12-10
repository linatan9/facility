import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PNAGuard } from '../shared/guards/pna.guard';
import { FacilitiesComponent } from './facilities.component';
import { FacilityEquipmentsComponent } from './facility-equipments/facility-equipments.component';

const routes: Routes = [
  {
    path: 'facilities',
    component: FacilitiesComponent,
    canActivate: [ PNAGuard ]
  },
  {
    path: 'facilities/:id',
    component: FacilityEquipmentsComponent,
    canActivate: [ PNAGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitiesRoutingModule { }
