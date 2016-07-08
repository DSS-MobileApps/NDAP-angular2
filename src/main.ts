import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, OpaqueToken } from '@angular/core';

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
    provide('MAPS_API_KEY', {useValue: environment.googleMapsAPIkey})
  ]
).catch(err => console.error(err));
