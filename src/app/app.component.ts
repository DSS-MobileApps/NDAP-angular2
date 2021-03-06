import { Component, OnInit } from '@angular/core';

// import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AppState } from './app.service';

import { MapService } from './map/map.service';
import { OrganisationService } from './organisations/organisation.service';
// import { OrganisationsComponent } from './organisations/organisations.component';
// import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { ProviderTypesService } from './search/search-categories/provider-types.service';
import { GeolocationService } from './shared/geolocation.service';
import { AnalyticsService } from './shared/analytics.service';

import '../modernizr-custom.js';


@Component({

  selector: 'angular2-service-finder-app',
  templateUrl: 'app.component.html',
  styleUrls: [
    'app.component.css',
    'app.component.media.css'],
  // directives: [ROUTER_DIRECTIVES],
  // providers: [OrganisationService, ProviderTypesService, GeolocationService]
})

export class AppComponent implements OnInit {
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
    private geolocationService: GeolocationService,
    public appState: AppState,
    public router: Router,
    public analytics: AnalyticsService
  ) {
    // geolocationService.getLocation(this.opts);
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          // console.log("routing", event.url, event.urlAfterRedirects);
          // ga('send', 'pageview', event.urlAfterRedirects);
          this.analytics.sendPageView(event.urlAfterRedirects);
        }
      });
  };

  ngOnInit() {
    // this.router.navigate(['/organisations']);
    console.log('Initial App State', this.appState.state);
  }

  getSearchResults() {

  }
}
