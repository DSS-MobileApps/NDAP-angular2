import { Component, OnInit } from '@angular/core';

// import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AppState } from './app.service';

import { MapService } from './map/map.service';
import { OrganisationService } from './organisations/organisation.service';
// import { OrganisationsComponent } from './organisations/organisations.component';
// import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { ProviderTypesService } from './search/search-categories/provider-types.service';
import { GeolocationService } from './shared/geolocation.service';

import '../modernizr-custom.js';


@Component({
  moduleId: module.id,
  selector: 'angular2-service-finder-app',
  templateUrl: 'angular2-service-finder-app.component.html',
  // styleUrls: [
  //     'angular2-service-finder-app.component.css',
  //     'angular2-service-finder-app.component.media.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [OrganisationService, ProviderTypesService, GeolocationService]
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
              private mapService: MapService,
              public appState: AppState
            ) {
              // geolocationService.getLocation(this.opts);

            };

  ngOnInit() {
    // this.router.navigate(['/organisations']);
    console.log('Initial App State', this.appState.state);
  }

    getSearchResults(){

    }
}
