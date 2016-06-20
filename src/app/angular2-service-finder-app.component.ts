import { Component, OnInit } from '@angular/core';

import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OrganisationService } from './organisations/organisation.service';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { ProviderTypesService } from './search/search-categories/provider-types.service';
import { GeolocationService } from './shared/geolocation.service';
import { nglocationService } from './shared/ng2-location/browser-location-service';
import {ngSelectLocation, EmitterService} from './shared/ng2-location/browser-location';

@Component({
  moduleId: module.id,
  selector: 'angular2-service-finder-app',
  templateUrl: 'angular2-service-finder-app.component.html',
  styleUrls: ['angular2-service-finder-app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [OrganisationService, ProviderTypesService, GeolocationService, nglocationService, EmitterService]
})

@Routes([
  {
    path: '/organisations/:id',
    component: OrganisationsComponent
  },
  {
    path: '/organisations',
    component: OrganisationsComponent
  },

  {
    path: '/organisation/:id',
    component: OrganisationDetailComponent
  },

  // Root Url
  {
  path: '/',
  component: OrganisationsComponent
},

// Catch all for any undefined URL
  {
  path: '*',
  component: OrganisationsComponent
  }


])

export class Angular2ServiceFinderAppComponent implements OnInit  {
  title = 'Disability Advocacy Finder';

  public userLoc: string;
  // public userLocation: ngSelectLocation;

  constructor(private router: Router,
              private providerTypesService: ProviderTypesService,
              private _ngLocation: nglocationService
            ) {
              window.localStorage.removeItem("city");
              _ngLocation.getCitydata();
              // this.selectedCity = localStorage.getItem('city');
            };

  ngOnInit() {
    // this.router.navigate(['/organisations']);
    // this.initGeoLocation();
    // userLocation.selectedCity

  }

  initGeoLocation() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            this.userLoc = `${position.coords.latitude},${position.coords.longitude}`;
            console.log('userLoc: ' + this.userLoc);
        });
        }
    }

    getSearchResults(){
        console.log('userLoc: ' + this.userLoc);
    }
}
