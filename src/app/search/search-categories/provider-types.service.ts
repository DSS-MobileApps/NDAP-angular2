import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { ProviderType } from './provider-type';

import { BackendService } from '../../shared/backend.service';
import { AppState } from '../../app.service';

const APPSTATE_PROVIDERTYPES = 'allTypes',
  APPSTATE_SELECTEDTYPE = 'selectedType';


@Injectable()
export class ProviderTypesService {


  private _filteredTypes: BehaviorSubject<ProviderType[]> = new BehaviorSubject([]);
  public filteredTypes: Observable<ProviderType[]> = this._filteredTypes.asObservable();

  // Observable for selected type record
  private _selectedType: BehaviorSubject<ProviderType> = new BehaviorSubject(null);
  selectedType = this._selectedType.asObservable();


  private dataStore: {  // This is where we will store our data in memory
    types: ProviderType[],
    selected: ProviderType
  };

  constructor(private http: Http,
    public appState: AppState,
    private backendService: BackendService
  ) {
    this.loadInitialState();
  }



  private loadInitialState() {

    this.dataStore = { types: [], selected: null };
    // get last results
    if (this.appState.get(APPSTATE_PROVIDERTYPES)) {
      this.dataStore.types = this.appState.get(APPSTATE_PROVIDERTYPES);
      this._filteredTypes.next(this.dataStore.types);
    }
    if (this.appState.get(APPSTATE_SELECTEDTYPE)) {
      this.dataStore.selected = this.appState.get(APPSTATE_SELECTEDTYPE);
      this._selectedType.next(this.dataStore.selected);
    }

    this.backendService.getProviderTypes()
      .subscribe(types => this.storeTypes(types));


  }

  /*
  *************************************
  * Methods that the Service returns
  *************************************
  */

  // Get all Types
  public getProviderTypes(): Observable<ProviderType[]> {

    let obs = this.backendService.getProviderTypes();
    obs.subscribe(types => this.storeTypes(types))
    return obs;

  }

  public updateSelectedType(selectedType: any) {
    this._selectedType.next(selectedType);
    this.dataStore.selected = selectedType;
    this.appState.set(APPSTATE_SELECTEDTYPE, selectedType);

  }


  private storeTypes(types: ProviderType[]) {
    this._filteredTypes.next(types);
    this.dataStore.types = types;
    this.appState.set(APPSTATE_PROVIDERTYPES, types);


  }

  // Sort types by Value
  public sortProviderTypes(providerTypes: ProviderType[], descending?: boolean): ProviderType[] {

    if (descending) {
      return providerTypes.sort(function (a, b) {
        return b.Value.localeCompare(a.Value);
      });
    } else {
      return providerTypes.sort(function (a, b) {
        return a.Value.localeCompare(b.Value);
      });
    }

  }

}
