import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, OpaqueToken } from '@angular/core';
import {Locker, LockerConfig} from 'angular2-locker'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { HTTP_PROVIDERS } from '@angular/http';
// import { ROUTER_PROVIDERS } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app/angular2-service-finder-app.routes';

import { Angular2ServiceFinderAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

// Main appComponent, [Array of Providers]
bootstrap(
  Angular2ServiceFinderAppComponent,
  [
    // ROUTER_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(Window, {useValue: window}),
    provide(Document, {useValue: document}),
    provide('MAPS_API_KEY', {useValue: environment.googleMapsAPIkey}),
    provide('API_URL', {useValue: environment.apiHost}),
    provide(LockerConfig, { useValue: new LockerConfig('FinderApp', Locker.DRIVERS.LOCAL)}),
    Locker
  ]
).catch(err => console.error(err));
