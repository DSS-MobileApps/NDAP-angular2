import { NgModule, provide }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { Angular2ServiceFinderAppComponent }   from './angular2-service-finder-app.component';

import {Locker, LockerConfig} from 'angular2-locker'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { HTTP_PROVIDERS } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './angular2-service-finder-app.routes';

import { environment } from './';


@NgModule({
    declarations: [Angular2ServiceFinderAppComponent],
    imports:      [BrowserModule,
                  // Router
                  RouterModule,//.forRoot(config),
                  // Forms
                  FormsModule,
                  ],
    providers:    [// ROUTER_PROVIDERS,
                    APP_ROUTER_PROVIDERS,
                    HTTP_PROVIDERS,
                    // disableDeprecatedForms(),
                    // provideForms(),
                    provide(Window, {useValue: window}),
                    provide(Document, {useValue: document}),
                    provide('MAPS_API_KEY', {useValue: environment.googleMapsAPIkey}),
                    provide('API_URL', {useValue: environment.apiHost}),
                    provide(LockerConfig, { useValue: new LockerConfig('FinderApp', Locker.DRIVERS.LOCAL)}),
                    Locker],
    bootstrap:    [Angular2ServiceFinderAppComponent],
})
export class AppModule {}
