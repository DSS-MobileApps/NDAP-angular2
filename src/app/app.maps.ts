import { ModuleWithProviders }  from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { environment } from '../environments/';

export const mapsModuleWithProviders: ModuleWithProviders = AgmCoreModule.forRoot({ apiKey: environment.googleMapsAPIkey });

export declare class MapsModule{}