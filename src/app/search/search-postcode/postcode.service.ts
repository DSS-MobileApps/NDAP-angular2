import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { BackendService } from '../../shared/backend.service';

import { Postcode } from './postcode';
import { AppState } from '../../app.service';

const APPSTATE_SELECTED_LOCATION = 'selectedLocation';

@Injectable()
export class PostcodeService {


    private dataStore: {  // This is where we will store our data in memory
        selectedLocation: Postcode
    };


    private _filteredLocations: BehaviorSubject<any[]> = new BehaviorSubject([]);
    public filteredLocations: Observable<any[]> = this._filteredLocations.asObservable();

    private _selectedLocation: BehaviorSubject<Postcode> = new BehaviorSubject(null);
    public selectedLocation: Observable<Postcode> = this._selectedLocation.asObservable();


    constructor(
        // private http: Http,
        public appState: AppState,
        private backendService: BackendService
    ) {
        this.loadInitialData();
    }

    private loadInitialData() {

        console.info('load initial selected location state data');

        this.dataStore = { selectedLocation: null };


        // get last selected location
        if (this.appState.get(APPSTATE_SELECTED_LOCATION)) {
            this.dataStore.selectedLocation = this.appState.get(APPSTATE_SELECTED_LOCATION);
            this._selectedLocation.next(this.dataStore.selectedLocation);
        }

    }

    getPostcodesForLocations(keyword): Observable<Postcode[]> {

        return this.backendService.
            getPostcodesFromKeyword(keyword);

    }

    setSelectedLocation(postcode: Postcode) {
        this._selectedLocation.next(postcode);
        this.appState.set(APPSTATE_SELECTED_LOCATION, postcode);

    }

}

// export var postcodeServiceInjectables: Array<any> = [
//   // provide(GeolocationService, { useClass: GeolocationService })
//   { provide: PostcodeService, useClass: PostcodeService }
// ];