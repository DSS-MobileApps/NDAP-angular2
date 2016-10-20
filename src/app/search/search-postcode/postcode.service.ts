import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { BackendService } from '../../shared/backend.service';

import { Postcode } from './postcode';

@Injectable()
export class PostcodeService {

  private _filteredLocations: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public filteredLocations: Observable<any[]> = this._filteredLocations.asObservable();


  constructor(
    // private http: Http,
    // public appState: AppState,
    private backendService: BackendService
  ) { }

  getPostcodesForLocations(keyword): Observable<Postcode[]> {

    return this.backendService.
      getPostcodesFromKeyword(keyword);

  }

}

// export var postcodeServiceInjectables: Array<any> = [
//   // provide(GeolocationService, { useClass: GeolocationService })
//   { provide: PostcodeService, useClass: PostcodeService }
// ];