import { Injectable, Inject }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import { ProviderType, Refiner } from '../search/index';

import { Organisation }   from './organisation';
import { AppState } from '../app.service';

import { AnalyticsService } from '../shared/analytics.service';
import { BackendService } from '../shared/backend.service';


@Injectable()
export class OrganisationService {

  // // Observable for Organisation Search Results
  // private orgListSource = new Subject<Organisation[]>();
  // orgListSource$ = this.orgListSource.asObservable();

  private _organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject([]);
  public organisations: Observable<Organisation[]> = this._organisations.asObservable();
  
  // Observable for Unfiltered Organisation Search Results
  private _orgsUnfiltered: BehaviorSubject<Organisation[]> = new BehaviorSubject([]);
  orgsUnfiltered = this._orgsUnfiltered.asObservable();

  // Observable for selected organisation record
  selectedOrganisation = new Subject<Organisation>();
  selectedOrganisation$ = this.selectedOrganisation.asObservable();

  // Observable for Organisation Search Results
  private refinerList = new Subject<Refiner[]>();
  refinerList$ = this.refinerList.asObservable();

  private dataStore: {  // This is where we will store our data in memory
      organisations: Organisation[],
      refiners: Refiner[]
    };
  constructor (private http: Http,
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


      if (this.appState.get().allOrgs == null){
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

       
    }

  
  /*
  *************************************
  * Methods that the Service returns
  *************************************
  */

  
  // Public Method called to get organisations list
  public refineOrgList(refineField, value, singleRefiner = false) {
    console.info(refineField, value);

    var newRef: Refiner = {type: refineField, value: value, summary: refineField + " refined by " + value};

    if (singleRefiner){
      this.dataStore.refiners = this.dataStore.refiners
        .filter((refiner) => refiner.type !== refineField);
      }

      this.dataStore.refiners.push(newRef);


    console.info(this.dataStore.refiners);

    // console.info(this.dataStore.organisations.filter((item) => item.Category === value))
    this._organisations.next(
        this.dataStore.organisations
        // .filter((item) => item.Category === value)
        .filter((item) => item.Category.indexOf(value) != -1)
      );

      this.refinerList.next(this.dataStore.refiners);

      this.analytics.sendEvent('Refine', refineField, value, null, null);


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

    this.refinerList.next(this.dataStore.refiners);

  }

  // Public Method called to get organisations list
  public getByKeyword(keyword) {
    this.appState.set('searchType', 'keyword');
    this.appState.set('searchValue1', keyword);

    // clear refiners
    this.dataStore.refiners = [];

    // console.info('subscribe to get all Orgs refining by keyword - check perf')

    if (this.appState.get().allOrgs){
      console.info('using all orgs cache', this.appState.get().allOrgs);

        let result = this.appState.get().allOrgs;
        let kLower = keyword.toLowerCase();
        this.dataStore.organisations = result.filter(item => this.keywordMatch(kLower, item));
        
        // console.log('got new orgs from kw search', this.dataStore.organisations);
        this._organisations.next(this.dataStore.organisations);
        this._orgsUnfiltered.next(this.dataStore.organisations);

        this.appState.set('results', this.dataStore.organisations);

        this.selectedOrganisation.next(null);
        this.refinerList.next(this.dataStore.refiners);

    }else{

        var sendTime = new Date();
        this.backendService.getOrganisations("all", null, null).subscribe(
              result => {

                let kLower = keyword.toLowerCase();
                this.dataStore.organisations = result.filter(item => this.keywordMatch(kLower, item));
                
                // console.log('got new orgs from kw search', this.dataStore.organisations);
                this._organisations.next(this.dataStore.organisations);
                this._orgsUnfiltered.next(this.dataStore.organisations);

                this.appState.set('results', this.dataStore.organisations);

                this.selectedOrganisation.next(null);
                this.refinerList.next(this.dataStore.refiners);

                var endTime = new Date();
                var milliseconds = (endTime.getTime() - sendTime.getTime());
                this.analytics.sendTiming('Search', 'Keyword', milliseconds, keyword, null);
              })

    }

    this.analytics.sendEvent('Search', 'Keyword', keyword, null, null);

  }

  // Public Method called to get organisations list
  public searchOrgList(searchType, value1, value2) {
    this.appState.set('searchType', searchType);
    this.appState.set('searchValue1', value1);
    this.appState.set('searchValue2', value2);
    // clear refiners
    this.dataStore.refiners = [];

    // console.info('subscribe to get Orgs - check perf')

    var sendTime = new Date();

    this.backendService.getOrganisations(searchType, value1, value2).subscribe(
      results => {
        this.dataStore.organisations = results;

        this._organisations.next(results);
        this._orgsUnfiltered.next(results);
        this.selectedOrganisation.next(null);
        this.refinerList.next(this.dataStore.refiners);

        this.appState.set('results', results);

        var endTime = new Date();
        var milliseconds = (endTime.getTime() - sendTime.getTime());
        this.analytics.sendTiming('Search', searchType, milliseconds, value1, null);


      },
      error => {
        console.error('from getOrganisations', error);
        this._organisations
              // .retry(3)
              .error(error)
              // .onErrorResumeNext(this.organisations);
        this._orgsUnfiltered.error(error);

      }
    )

    this.analytics.sendEvent('Search', searchType, value1, null, null);
    // ga('send', 'event', 'category', 'action', 'opt_label', opt_value, {'nonInteraction': 1});
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

    public updateSelectedOrganisation (selectedOrganisation){
      this.selectedOrganisation.next(selectedOrganisation);
      this.appState.set('selectedOrganisation', selectedOrganisation);

    }



  private keywordMatch(kLower, item){
      return (item.Name != null && item.Name.toLowerCase().includes(kLower)) ||
      // (item.FurtherDetails != null && item.FurtherDetails.toLowerCase().includes(kLower)) ||
      (item.Category != null && item.Category.toLowerCase().includes(kLower))
    }




}
