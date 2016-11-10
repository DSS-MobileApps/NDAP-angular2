import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { LockerModule, LockerConfig, DRIVERS } from 'angular2-locker'
// import { MapService } from './map/map.service';
// import {LazyMapsAPILoader, LazyMapsAPILoaderConfig} from './map/loading/lazy-maps-api-loader';
// import {MapsAPILoader} from './map/loading/maps-api-loader';
// import {BROWSER_GLOBALS_PROVIDERS} from './map/loading/browser-globals';

import { AgmCoreModule, GoogleMapsAPIWrapper, SebmGoogleMapMarker } from 'angular2-google-maps/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

// import 'markerclustererplus';


import { AppState } from './app.service';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Router
import { RouterModule } from '@angular/router';
// import { APP_ROUTER_PROVIDERS } from './angular2-service-finder-app.routes';
import { routing } from './app.routes';

// Components for Router
// import { SearchAreaComponent, SearchResultsComponent } from './search/index';
// import { OrganisationComponent } from './organisations/organisation/organisation.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { OrganisationsComponent, OrganisationComponent, OrganisationListComponent, OrganisationDetailComponent } from './organisations/index';

import { SearchAreaComponent, SearchResultsComponent, SearchComponent, SearchSummaryComponent, RefinerComponent, ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent, SearchPostcodeComponent } from './search/index';
import { MapComponent } from './map/index';
import { MapsModule, mapsModuleWithProviders } from './app.maps';

import { ErrorMessageComponent } from './error/index';

import { EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink } from './shared/pipes/';

import { environment } from '../environments/';
import { SmapContainerComponent, SmapComponent } from './map/smap/index';

import { OrganisationService } from './organisations/organisation.service';
import { AnalyticsService } from './shared/analytics.service';
import { BackendService } from './shared/backend.service';
import { ProviderTypesService } from './search/search-categories/provider-types.service';
import { GeolocationService } from './shared/geolocation.service';
import { PostcodeService } from './search/search-postcode/postcode.service';
import { RemoveSpaces } from './shared/index';


const lockerConfig = new LockerConfig('FinderApp', DRIVERS.LOCAL);

@NgModule({
  declarations: declarations(),
  imports: imports(),
  providers: providers(),
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function lockerConfig() {
//   return new LockerConfig('FinderApp', Locker.DRIVERS.LOCAL);
// }

export function declarations() {
  return [
    AppComponent,
    SearchAreaComponent, SearchComponent, SearchResultsComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent, RefinerComponent, SearchSummaryComponent, ProviderTypesComponent, SearchPostcodeComponent,
    EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink,
    OrganisationsComponent, OrganisationComponent, OrganisationDetailComponent, OrganisationListComponent, OrganisationDetailComponent,
    MapComponent,
    AboutComponent,
    ContactComponent,
    ErrorMessageComponent,
    // SebmGoogleMapMarker,
    SmapComponent, SmapContainerComponent, SearchPostcodeComponent,
    RemoveSpaces
  ];
}

export function imports() {
  return [BrowserModule,
    // Router
    // RouterModule,//.forRoot(config),
    // Forms
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIkey
    }),
    routing,

    // LockerModule.forRoot({ driverNamespace: 'FinderApp', defaultDriverType: DRIVERS.LOCAL, namespaceSeparator: '-' })
    LockerModule.forRoot(lockerConfig)
    // RouterModule.forChild([
    //     { path: 'search', component: SearchAreaComponent },
    //     { path: 'organisations', component: SearchResultsComponent },
    //     { path: 'organisation/:id', component: OrganisationComponent },
    //     { path: 'about', component: AboutComponent },
    //     { path: 'contact', component: ContactComponent }
    //
    //   ])
  ];
}
export function providers() {
  return [  // disableDeprecatedForms(),
    // provideForms(),
    // BROWSER_GLOBALS_PROVIDERS,
    // { provide: MapsAPILoader, useClass: LazyMapsAPILoader},
    // { provide: LazyMapsAPILoaderConfig,
    //   useFactory: () => {
    //   let config = new LazyMapsAPILoaderConfig();
    //   config.apiKey = environment.googleMapsAPIkey;
    //   return config;
    // }},
    // MapService,
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    Title,
    AnalyticsService,
    BackendService,
    OrganisationService,
    ProviderTypesService,
    PostcodeService,
    GeolocationService,
    GoogleMapsAPIWrapper,
    AppState,
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: 'MAPS_API_KEY', useValue: environment.googleMapsAPIkey },
    { provide: 'API_URL', useValue: environment.apiHost },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref }];
}