import { Component, ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
// import { Router, OnActivate, RouteSegment } from '@angular/router';

import { MapService } from '../map/map.service';
import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

@Component({
  moduleId: module.id,
  selector: 'organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html',
  host: {'class' : 'ng-animate orgDetailContainer'}
})

export class OrganisationDetailComponent implements AfterViewInit  {
  @ViewChild('map') mapElement: ElementRef;
  @Input() organisation: Organisation;

  constructor(
    // private router: Router,
    private organisationService: OrganisationService,
    private mapService: MapService
  ) {
  }

  getOrganisation(organisation: Organisation){
    this.organisation = organisation;
    if (this.organisation){
      this.getOrganisationById(organisation.Id);
    }

  }

  getOrganisationById(id){
    this.organisationService.getOrganisation(id)
    .subscribe((organisation) => {
      this.organisation = organisation;
      this.initMap();
    });
  }

  // routerOnActivate(curr: RouteSegment): void {
  //
  //   if (!this.organisation){
  //     // Grab the current ID from the URL
  //     let id = +curr.getParam('id');
  //
  //     // Set organisation to the one returned
  //     this.getOrganisationById(id);
  //   }
  // }

  ngAfterViewInit() {
    // this.initMap();
    this.organisationService.selectedOrganisation$
      .subscribe(
        selectedOrganisation => this.getOrganisation(selectedOrganisation),
        error =>  console.log(error));

  }

  initMap() {
    if (this.mapElement != null && this.organisation != null)
    {
      this.mapService.createDetailMap(this.mapElement.nativeElement, this.organisation)
    }
  }

  goBack() {
    window.history.back();
  }
  deselect() {
    this.organisationService.updateSelectedOrganisation(null);
  }
}
