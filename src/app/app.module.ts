import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import {Locker, LockerConfig} from 'angular2-locker'
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

import { SearchAreaComponent, SearchResultsComponent, SearchComponent, SearchSummaryComponent, RefinerComponent, ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent } from './search/index';
import { MapComponent } from './map/index';


import { EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink } from './shared/pipes/';

import { environment } from '../environments/';
import { SmapContainerComponent, SmapComponent } from './map/smap/index';


@NgModule({
    declarations: [AppComponent,
                  SearchAreaComponent, SearchComponent, SearchResultsComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent, RefinerComponent, SearchSummaryComponent, ProviderTypesComponent,
                  EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink,
                  OrganisationsComponent, OrganisationComponent, OrganisationDetailComponent,OrganisationListComponent, OrganisationDetailComponent,
                  MapComponent,
                  AboutComponent,
                  ContactComponent,
                  // SebmGoogleMapMarker,
                  SmapComponent, SmapContainerComponent],
    imports:      [BrowserModule,
                  // Router
                  // RouterModule,//.forRoot(config),
                  // Forms
                  FormsModule,
                  HttpModule,
                  AgmCoreModule.forRoot({
                    apiKey: environment.googleMapsAPIkey
                  }),
                  routing,
                  // RouterModule.forChild([
                  //     { path: 'search', component: SearchAreaComponent },
                  //     { path: 'organisations', component: SearchResultsComponent },
                  //     { path: 'organisation/:id', component: OrganisationComponent },
                  //     { path: 'about', component: AboutComponent },
                  //     { path: 'contact', component: ContactComponent }
                  //
                  //   ])
                  ],
    providers:    [  // disableDeprecatedForms(),
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
                    GoogleMapsAPIWrapper,
                    AppState,
                    { provide: Window, useValue: window},
                    { provide: Document, useValue: document},
                    { provide: 'MAPS_API_KEY', useValue: environment.googleMapsAPIkey},
                    { provide: 'API_URL', useValue: environment.apiHost},
                    { provide: LockerConfig,  useValue: new LockerConfig('FinderApp', Locker.DRIVERS.LOCAL)},
                    Locker],
    bootstrap:    [AppComponent],
})
export class AppModule {}
