import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

// Used for the google maps component (/map/)
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig} from 'angular2-google-maps/core';

import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';

import { Angular2ServiceFinderAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

// Main appComponent, [Array of Providers]
bootstrap(
  Angular2ServiceFinderAppComponent,
  [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    provide(LazyMapsAPILoaderConfig, {useFactory: () => {
      let config = new LazyMapsAPILoaderConfig();
      config.apiKey = environment.googleMapsAPIkey;
      return config;
    }})

  ]
);
