import { Component, ElementRef, AfterViewInit, ViewChild  } from '@angular/core';
import { Router, OnActivate, RouteSegment } from '@angular/router';

import { MapService } from '../map/map.service';
import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

@Component({
  moduleId: module.id,
  selector: 'my-organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html'
})

export class OrganisationDetailComponent implements OnActivate, AfterViewInit  {
  @ViewChild('map') mapElement: ElementRef;
  organisation: Organisation;

  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private mapService: MapService
  ) {}

  routerOnActivate(curr: RouteSegment): void {
    // Grab the current ID from the URL
    let id = +curr.getParam('id');

    // Set organisation to the one returned
    this.organisationService.getOrganisation(id)
    .subscribe((organisation) => {
      this.organisation = organisation;
      this.initMap();
    });
  }

  ngAfterViewInit() {
    this.initMap();
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
}
