import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';

// import {platformBrowser} from '@angular/platform-browser';
// import {MyAppModuleNgFactory} from './app.ngfactory'; //generated code

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, OpaqueToken } from '@angular/core';

import { Angular2ServiceFinderAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory);
