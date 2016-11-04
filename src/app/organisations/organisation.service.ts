import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import { ProviderType, Refiner } from '../search/index';

import { Organisation } from './organisation';
import { AppState } from '../app.service';

import { AnalyticsService } from '../shared/analytics.service';
import { BackendService } from '../shared/backend.service';

const APPSTATE_RESULTS = 'results',
  APPSTATE_RESULTS_UNFILTERED = 'resultsUnfiltered',
  APPSTATE_REFINERS = 'refiners',
  APPSTATE_SEARCHTYPE = 'searchType',
  APPSTATE_SEARCHVAL = 'searchValue1',
  APPSTATE_SELECTEDORG = 'selectedOrganisation'
  ;

@Injectable()
export class OrganisationService {

  // // Observable for Organisation Search Results
  // private orgListSource = new Subject<Organisation[]>();
  // orgListSource$ = this.orgListSource.asObservable();

  private;


  // Observable for search types
  private _searchType: BehaviorSubject<string> = new BehaviorSubject(null);
  searchType = this._searchType.asObservable();
  // Observable for search types
  private _searchValue: BehaviorSubject<string> = new BehaviorSubject(null);
  searchValue = this._searchValue.asObservable();


  private _organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject([]);
  public organisations: Observable<Organisation[]> = this._organisations.asObservable();

  // Observable for Unfiltered Organisation Search Results
  private _orgsUnfiltered: BehaviorSubject<Organisation[]> = new BehaviorSubject([]);
  orgsUnfiltered = this._orgsUnfiltered.asObservable();

  // Observable for selected organisation record
  private _selectedOrganisation: BehaviorSubject<Organisation> = new BehaviorSubject(null);
  selectedOrganisation = this._selectedOrganisation.asObservable();

  // Observable for Organisation Search Results
  private _refiners: BehaviorSubject<Refiner[]> = new BehaviorSubject(null);
  refiners = this._refiners.asObservable();

  private dataStore: {  // This is where we will store our data in memory
    organisations: Organisation[],
    refiners: Refiner[]
  };
  constructor(private http: Http,
    public appState: AppState,
    public backendService: BackendService,
    public analytics: AnalyticsService) {

    this.loadInitialData();


  }

  // get organisations() {
  //       return this._organisations.asObservable();
  //   }

  private loadInitialData() {

    console.info('load initial organisation data');

    this.dataStore = { organisations: [], refiners: [] };


    if (this.appState.get().allOrgs == null) {
      this.backendService.getAllOrganisations()
        .subscribe(
        orgs => {
          // console.info('got initial organisations list');
          // this.dataStore.organisations = orgs;
          this.appState.set('allOrgs', orgs);

          // this._organisations.next(orgs);
        },
        err => console.log("Error retrieving Organisations")
        );

    }

    // get last results
    if (this.appState.get(APPSTATE_RESULTS)) {
      this.dataStore.organisations = this.appState.get(APPSTATE_RESULTS);
      this._organisations.next(this.dataStore.organisations);
      this._orgsUnfiltered.next(this.dataStore.organisations);


      // // get last search type
      // if (this.appState.get(APPSTATE_SEARCHTYPE)) {
      //   this._searchType.next(this.appState.get(APPSTATE_SEARCHTYPE));
      // }
      // // get last search value
      // if (this.appState.get(APPSTATE_SEARCHVAL)) {
      //   this._searchType.next(this.appState.get(APPSTATE_SEARCHVAL));
      // }
      this.formattedSearchLabels(this.appState.get(APPSTATE_SEARCHTYPE), this.appState.get(APPSTATE_SEARCHVAL));

      // get last search type
      if (this.appState.get(APPSTATE_REFINERS)) {
        this.dataStore.refiners = this.appState.get(APPSTATE_REFINERS);
        this._refiners.next(this.dataStore.refiners);

        if (this.dataStore.refiners.length > 0) {
          this._organisations.next(this.filterByCategory(this.dataStore.refiners[0].value));
        }

      }

    }



  }


  /*
  *************************************
  * Methods that the Service returns
  *************************************
  */


  // Public Method called to get organisations list
  public refineOrgList(refineField, value, singleRefiner = false) {
    console.info(refineField, value);

    var newRef: Refiner = { type: refineField, value: value, summary: refineField + " refined by " + value };

    if (singleRefiner) {
      this.dataStore.refiners = this.dataStore.refiners
        .filter((refiner) => refiner.type !== refineField);
    }

    this.dataStore.refiners.push(newRef);


    console.info(this.dataStore.refiners);

    // console.info(this.dataStore.organisations.filter((item) => item.Category === value))
    this._organisations.next(this.filterByCategory(value));

    this._refiners.next(this.dataStore.refiners);

    this.appState.set(APPSTATE_REFINERS, this.dataStore.refiners);

    this.analytics.sendEvent('Refine', refineField, value, null, null);


  }

  private filterByCategory(value) {
    return this.dataStore.organisations
      // .filter((item) => item.Category === value)
      .filter((item) => item.Category.indexOf(value) != -1)
  }

  // Public Method called to get organisations list
  public clearRefinerProperty(refineField) {

    this.dataStore.refiners = this.dataStore.refiners
      .filter((refiner) => refiner.type !== refineField);


    // console.info(this.dataStore.refiners);

    switch (refineField) {

      case "byProviderType":
        this._organisations.next(
          this.dataStore.organisations
          // .filter((item) => item.Category === value)
        );

      default:
    }


    this._refiners.next(this.dataStore.refiners);

    this.appState.set(APPSTATE_REFINERS, null);

  }

  // Public Method called to get organisations list
  public getByKeyword(keyword): Observable<any> {
    this.appState.set(APPSTATE_SEARCHTYPE, 'keyword');
    this.appState.set(APPSTATE_SEARCHVAL, keyword);

    this.formattedSearchLabels('byKeyword', keyword);

    // clear refiners
    this.dataStore.refiners = [];

    var obs = Observable.of(null);

    // console.info('subscribe to get all Orgs refining by keyword - check perf')

    if (this.appState.get().allOrgs) {
      console.info('using all orgs cache', this.appState.get().allOrgs);

      let result = this.appState.get().allOrgs;
      let kLower = keyword.toLowerCase();
      this.dataStore.organisations = this.sortOrganisations(result.filter(item => this.keywordMatch(kLower, item)));
      // this.dataStore.organisations = result.filter(item => this.keywordMatch(kLower, item));

      this._organisations.next(this.dataStore.organisations);
      this._orgsUnfiltered.next(this.dataStore.organisations);

      this.appState.set(APPSTATE_RESULTS, this.dataStore.organisations);
      this.appState.set(APPSTATE_REFINERS, this.dataStore.refiners);

      this._selectedOrganisation.next(null);
      this._refiners.next(this.dataStore.refiners);


      return Observable.of(true);

    } else {

      var sendTime = new Date();
      obs = this.backendService.getOrganisations("all", null, null);
      obs.subscribe(
        result => {

          let kLower = keyword.toLowerCase();
          this.dataStore.organisations = this.sortOrganisations(result.filter(item => this.keywordMatch(kLower, item)));
          // this.dataStore.organisations = result.filter(item => this.keywordMatch(kLower, item));

          this._organisations.next(this.dataStore.organisations);
          this._orgsUnfiltered.next(this.dataStore.organisations);

          this.appState.set(APPSTATE_RESULTS, this.dataStore.organisations);
          this.appState.set(APPSTATE_REFINERS, this.dataStore.refiners);


          this._selectedOrganisation.next(null);
          this._refiners.next(this.dataStore.refiners);

          var endTime = new Date();
          var milliseconds = (endTime.getTime() - sendTime.getTime());
          this.analytics.sendTiming('Search', 'Keyword', milliseconds, keyword, null);
          return Observable.of(true);

        },
        error => {
          console.error('from getOrganisations', error);
          return Observable.of(error);
        })

    }

    this.analytics.sendEvent('Search', 'Keyword', keyword, null, null);

    return obs;

  }

  // Public Method called to get organisations list
  public searchOrgList(searchType, value1, value2): Observable<any> {
    this.appState.set(APPSTATE_SEARCHTYPE, searchType);
    this.appState.set(APPSTATE_SEARCHVAL, value1);
    this.appState.set('searchValue2', value2);

    this.formattedSearchLabels(searchType, value1);


    // clear refiners
    this.dataStore.refiners = [];

    // console.info('subscribe to get Orgs - check perf')

    var sendTime = new Date();

    let obs = this.backendService.getOrganisations(searchType, value1, value2);
    obs.subscribe(
      results => {
        this.dataStore.organisations = results;

        this._organisations.next(results);
        this._orgsUnfiltered.next(results);
        this._selectedOrganisation.next(null);
        this._refiners.next(this.dataStore.refiners);


        this.appState.set(APPSTATE_RESULTS, results);
        this.appState.set(APPSTATE_REFINERS, this.dataStore.refiners);


        var endTime = new Date();
        var milliseconds = (endTime.getTime() - sendTime.getTime());
        this.analytics.sendTiming('Search', searchType, milliseconds, value1, null);

        return Observable.of(true);

      }
      ,
      error => {
        console.error('from getOrganisations', error);

        // this._organisations.next([])
        // this._orgsUnfiltered.next([]);

        return Observable.of(error);

      }
    )

    this.analytics.sendEvent('Search', searchType, value1, null, null);
    // ga('send', 'event', 'category', 'action', 'opt_label', opt_value, {'nonInteraction': 1});

    return obs;
  }

  // Public method called to get a single Org
  public getOrganisation(id: number): Observable<Organisation> {
    this.analytics.sendEvent('Select', 'Organisation', id, null, null);

    // return this.getJsonFromAPI(
    //   this.apiUrl
    //   + this.getSingleOrganisationUrl + id);

    return this.backendService.getOrganisation(id);

    // return this.getJsonFromAPI("/data/detail-sample.json");

  }

  public updateSelectedOrganisation(selectedOrganisation) {
    this._selectedOrganisation.next(selectedOrganisation);
    this.appState.set(APPSTATE_SELECTEDORG, selectedOrganisation);

  }


  private formattedSearchLabels(searchType, value) {
    // console.log('format search label start', searchType, value);

    switch (searchType) {

      case "byProviderType":
        this._searchType.next('Provider Type');
        this._searchValue.next('Provider types of ' + value);
        break;

      case "byRadius":
        this._searchType.next('Radius');
        this._searchValue.next('within ' + value + 'kms of your location');
        break;

      case "byState":
        this._searchType.next('State');
        this._searchValue.next('in ' + value.code);
        break;

      case "byKeyword":
        this._searchType.next('Keyword');
        this._searchValue.next('matching ' + value);
        break;

      case "byPostCode":
        this._searchType.next('Postcode');
        this._searchValue.next('for postcode ' + value);
        break;

      case "all":
        this._searchType.next('All');
        this._searchValue.next('in all organisations');
        break;

      default:
        break;
      //   this._searchType.next('All');
      //   this._searchValue.next('all organisations');
      // console.log('format search label', searchType, value);
    }

  }

  private keywordMatch(kLower, item: Organisation) {
    return (item.Name != null && item.Name.toLowerCase().includes(kLower)) ||
      // (item.FurtherDetails != null && item.FurtherDetails.toLowerCase().includes(kLower)) ||
      (item.Suburb != null && item.Suburb.toLowerCase().includes(kLower)) ||
      (item.Category != null && item.Category.toLowerCase().includes(kLower))
  }

  // Sort types by Value
  public sortOrganisations(organisations: Organisation[], descending?: boolean): Organisation[] {

    if (descending) {
      return organisations.sort(function (a, b) {
        return b.Name.localeCompare(a.Name);
      });
    } else {
      return organisations.sort(function (a, b) {
        return a.Name.localeCompare(b.Name);
      });
    }

  }



}
