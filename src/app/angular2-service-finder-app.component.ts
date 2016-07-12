import { Component, OnInit } from '@angular/core';

// import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MapService } from './map/map.service';
import { OrganisationService } from './organisations/organisation.service';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { ProviderTypesService } from './search/search-categories/provider-types.service';
import { GeolocationService } from './shared/geolocation.service';

@Component({
  moduleId: module.id,
  selector: 'angular2-service-finder-app',
  templateUrl: 'angular2-service-finder-app.component.html',
  styleUrls: ['angular2-service-finder-app.component.css', 'common.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [OrganisationService, ProviderTypesService, GeolocationService, MapService]
})

export class Angular2ServiceFinderAppComponent implements OnInit  {
  title = 'Disability Advocacy Finder';

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
          }

  public userLoc: string;
  // public userLocation: ngSelectLocation;

  constructor(
              private providerTypesService: ProviderTypesService,
              private organisationService: OrganisationService,
              // ngLocation: nglocationService,
              private geolocationService: GeolocationService,
              private mapService: MapService
            ) {
              // geolocationService.getLocation(this.opts);

            };

  ngOnInit() {
    // this.router.navigate(['/organisations']);
  }

    getSearchResults(){

    }
}
