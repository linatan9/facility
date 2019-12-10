import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { Facility } from '../../core/repositories/facilities/facility.entity';
import { filter } from 'rxjs/operators';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';
import { Subscription } from 'rxjs';
import { FacilityEquipmentTypes } from '../../core/repositories/facilities/facility-equipment-types.enum';
import FacilityEquipmentTabs from '../../core/repositories/facilities/facility-breadcrumbs/facility-equipment-tabs.constant';
import { FacilityBreadcrumbsLevels } from '../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumbs-levels.enum';
import { ModalService } from '../../shared/ui-components/modal';
import { FacilityMailComponent } from '../facility-mail/facility-mail.component';
import { MODAL_SERVICE } from '../../shared/ui-components/modal/modal-service.token';

@Component({
  selector: 'facility-equipments',
  templateUrl: './facility-equipments.component.html',
  styleUrls: ['./facility-equipments.component.scss']
})
export class FacilityEquipmentsComponent implements OnInit, OnDestroy {
  facilities: Facility[];
  selectedFacility: Facility;
  selectedFacilityId: string;
  selectedWellId?: string;
  routeSubscription: Subscription;
  facilityEquipmentTypes = FacilityEquipmentTypes;
  selectedTabIndex = 0;
  facilityChangedSubscription: Subscription;
  facilityEquipmentTabs = FacilityEquipmentTabs;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facilitiesService: FacilitiesService,
    private loaderService: LoaderModalService,
    @Inject(MODAL_SERVICE) private modalService: ModalService
  ) { }

  ngOnInit() {
    this.selectedFacilityId = this.route.snapshot.params.id;

    this.facilitiesService.getFacilities({})
      .subscribe((facilities: Facility[]) => {
        this.facilities = facilities;
      });
    this.getSelectedFacility(true);

    this.routeSubscription = this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    )
      .subscribe(() => {
        this.selectedFacilityId = this.route.snapshot.params.id;
        this.getSelectedFacility(true);
      });

    this.facilityChangedSubscription = this.facilitiesService.onFacilityEquipmentChanged()
      .subscribe(() => this.getSelectedFacility());
  }

  getSelectedFacility(shouldSetBreadcrumbs = false) {
    this.loaderService.open();
    this.facilitiesService.getFacilityDetails(this.selectedFacilityId)
      .subscribe((facility: Facility) => {
        this.selectedFacility = facility;
        if (shouldSetBreadcrumbs) {
          this.setBreadcrumbs();
        }
        this.loaderService.close();
        if (this.isWellIdInQueryParams()) {
          this.changeTabOnWellByWellId();
        }
      });
  }

  isWellIdInQueryParams() {
    return this.route.snapshot.queryParamMap.has('wellId');
  }

  changeTabOnWellByWellId() {
    this.selectedWellId = this.route.snapshot.queryParamMap.get('wellId');
    if (this.selectedWellId) {
      this.selectedTabIndex = 1;
    }
  }

  onFacilityChanged(facilityId: string) {
    this.router.navigate([`facilities/${facilityId}`]);
  }

  navigateToFacilitiesList() {
    this.router.navigate(['facilities']);
  }

  onTabChange(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
    this.setBreadcrumbs();
  }

  setBreadcrumbs() {
    const selectedEquipType = this.facilityEquipmentTabs[this.selectedTabIndex];
    const selectedEquipmentTitle = FacilityEquipmentTypes[selectedEquipType];
    const selectedEquipmentNumber = this.selectedFacility && this.selectedFacility[selectedEquipType] ?
      this.selectedFacility[selectedEquipType].content.length : '';
    this.facilitiesService.facilityBreadcrumbChanged.next({
      level: FacilityBreadcrumbsLevels.Equipment,
      title: `${selectedEquipmentTitle} ${selectedEquipmentNumber ? `(${selectedEquipmentNumber})` : ''}`
    });
  }

  openMailModal() {
    this.modalService.openModal(
      FacilityMailComponent,
      { facility: this.selectedFacility },
      {class: 'facility-mail'}
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.facilityChangedSubscription.unsubscribe();
  }
}
