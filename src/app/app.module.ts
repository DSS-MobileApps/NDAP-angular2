import { NgModule, provide }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { Angular2ServiceFinderAppComponent }   from './angular2-service-finder-app.component';

import {Locker, LockerConfig} from 'angular2-locker'
import { MapService } from './map/map.service';
import {LazyMapsAPILoader, LazyMapsAPILoaderConfig} from './map/loading/lazy-maps-api-loader';
import {MapsAPILoader} from './map/loading/maps-api-loader';
import {BROWSER_GLOBALS_PROVIDERS} from './map/loading/browser-globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { HTTP_PROVIDERS } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Router
import { RouterModule } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './angular2-service-finder-app.routes';

// Components for Router
import { SearchAreaComponent, SearchResultsComponent } from './search/index';
import { OrganisationComponent } from './organisations/organisation/organisation.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { environment } from './';


@NgModule({
    declarations: [Angular2ServiceFinderAppComponent, SearchAreaComponent],
    imports:      [BrowserModule,
                  // Router
                  RouterModule,//.forRoot(config),
                  // Forms
                  FormsModule,
                  RouterModule.forChild([
                      { path: 'search', component: SearchAreaComponent },
                      { path: 'organisations', component: SearchResultsComponent },
                      { path: 'organisation/:id', component: OrganisationComponent },
                      { path: 'about', component: AboutComponent },
                      { path: 'contact', component: ContactComponent }

                    ])
                  ],
    providers:    [// ROUTER_PROVIDERS,
                    APP_ROUTER_PROVIDERS,
                    HTTP_PROVIDERS,
                    // disableDeprecatedForms(),
                    // provideForms(),
                    BROWSER_GLOBALS_PROVIDERS,
                    provide(MapsAPILoader, {useClass: LazyMapsAPILoader}),
                    provide(LazyMapsAPILoaderConfig, {useFactory: () => {
                      let config = new LazyMapsAPILoaderConfig();
                      config.apiKey = 'AIzaSyBKnx4o9xTn2A0GhR_4qatHOnNLOnDf1rs';
                      return config;
                    }}),
                    MapService,
                    provide(Window, {useValue: window}),
                    provide(Document, {useValue: document}),
                    provide('MAPS_API_KEY', {useValue: environment.googleMapsAPIkey}),
                    provide('API_URL', {useValue: environment.apiHost}),
                    provide(LockerConfig, { useValue: new LockerConfig('FinderApp', Locker.DRIVERS.LOCAL)}),
                    Locker],
    bootstrap:    [Angular2ServiceFinderAppComponent],
})
export class AppModule {}
