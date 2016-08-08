import { Injectable, Inject }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { ProviderType, Refiner } from '../search/index';

import { Organisation }   from './organisation';

@Injectable()
export class OrganisationService {

  // Observable for Organisation Search Results
  private orgListSource = new Subject<Organisation[]>();
  orgListSource$ = this.orgListSource.asObservable();

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
  constructor (private http: Http, @Inject('API_URL') private apiUrl: string) {
      this.dataStore = { organisations: [], refiners: [] };
  }

  /*
  *************************************
  * API Calls
  *************************************
  */

  // All Organisations (URL) (800ms on average)
  private getAllOrganisationsUrl =
    '/api/provider/getall/all/NDAP';

  // Single Organisation (URL + id) (60ms on average)
  private getSingleOrganisationUrl =
    '/api/provider/';

  // Organisation (URL + postcode) (60ms on average)
  private getOrganisationsInPostcodeUrlA =
    '/api/provider/getallbypostcode/'

  private getOrganisationsInPostcodeUrlB =
    '/NDAP'

  // Get all by Provider Type
  private getOrganisationsFilteredByTypeUrlA =
    '/api/provider/getallbytype/';

  private getOrganisationsFilteredByTypeUrlB =
      '/NDAP';


  private getOrganisationsByState =
        '/api/provider/getallbyState/'
  private getOrganisationsByDistance =
        '/api/provider/GetAllByDistance/'

  private getOrganisationsByKeyword =
        '/api/provider/GetAllByKeyword/'

  // Get suburbs from a postcode
  // '/api/location/';

  // Get by State
  // /api/provider/getallbystate/ACT/NDAP

  // Get Provider Types
  // /api/utilities/getallprovidertypes/NDAP

  // Get by name
  // ????

  // Get within a shape
  // /api/provider
  // /GetAllWithinShape/-36.037825426409505/148.3338165283203/

  // Get within a distance
  // /api/provider/GetAllByDistance/-35.276/149.13/300


  /*
  *************************************
  * Methods that the Service returns
  *************************************
  */

  // TODO - add other methods
  // Public Method called to get organisations list
  getCachedList() {
    console.info(this.dataStore.organisations);
    this.orgListSource.next(
        this.dataStore.organisations
      );
  }


  replaceRefiner(refineField, value){
    // if (refine)
  }

  // Public Method called to get organisations list
  refineOrgList(refineField, value, singleRefiner = false) {
    console.info(refineField, value);

    var newRef: Refiner = {type: refineField, value: value, summary: refineField + " refined by " + value};

    if (singleRefiner){
      this.dataStore.refiners = this.dataStore.refiners
        .filter((refiner) => refiner.type !== refineField);
      }
      // this.dataStore.refiners
      // .map((refiner) => {
      //   if (refiner.type === refineField
      //       && refiner.value !== value)
      //   {
      //     refiner.value = value
      //   }
      // })
      this.dataStore.refiners.push(newRef);


    console.info(this.dataStore.refiners);

    // console.info(this.dataStore.organisations.filter((item) => item.Category === value))
    this.orgListSource.next(
        this.dataStore.organisations
        .filter((item) => item.Category === value)
      );

      this.refinerList.next(this.dataStore.refiners);

  }

  // Public Method called to get organisations list
  clearRefinerProperty(refineField) {

    this.dataStore.refiners = this.dataStore.refiners
      .filter((refiner) => refiner.type !== refineField);


      console.info(this.dataStore.refiners);

    switch (refineField) {

      case "byProviderType":
      this.orgListSource.next(
          this.dataStore.organisations
          // .filter((item) => item.Category === value)
        );
      default:
    }

    this.refinerList.next(this.dataStore.refiners);

  }

  // Public Method called to get organisations list
  getByKeyword(keyword) {

    // clear refiners
    this.dataStore.refiners = [];

    console.info('subscribe to get all Orgs refining by keyword - check perf')

    this.getOrganisations("all", null, null).subscribe(
      result => {
        let kLower = keyword.toLowerCase();
        this.dataStore.organisations = result.filter(item => this.keywordMatch(kLower, item));
        this.orgListSource.next(this.dataStore.organisations);
        this.selectedOrganisation.next(null);
        this.refinerList.next(this.dataStore.refiners);
      }
    )
  }

  keywordMatch(kLower, item){
      return (item.Name != null && item.Name.toLowerCase().includes(kLower)) ||
      // (item.FurtherDetails != null && item.FurtherDetails.toLowerCase().includes(kLower)) ||
      (item.Category != null && item.Category.toLowerCase().includes(kLower))
    }

  // Public Method called to get organisations list
  searchOrgList(searchType, value1, value2) {

    // clear refiners
    this.dataStore.refiners = [];

    console.info('subscribe to get Orgs - check perf')

    this.getOrganisations(searchType, value1, value2).subscribe(
      result => {
        this.dataStore.organisations = result;
        this.orgListSource.next(result);
        this.selectedOrganisation.next(null);
        this.refinerList.next(this.dataStore.refiners);
      }
    )
  }

  private getOrganisations(searchType, value1, value2): Observable<Organisation[]> {
    switch (searchType) {

    case "byProviderType":
      return this.getJsonFromAPI(
        this.apiUrl
        + this.getOrganisationsFilteredByTypeUrlA
        + value1.Code
        + this.getOrganisationsFilteredByTypeUrlB);

    case "byRadius":
            return this.getJsonFromAPI(
              this.apiUrl
              + this.getOrganisationsByDistance
              + "-35.276/149.13/"
              + value1
              + this.getOrganisationsInPostcodeUrlB);

    case "byState":
            return this.getJsonFromAPI(
              this.apiUrl
              + this.getOrganisationsByState
              // + "-35.276/149.13/"
              + value1.code
              + this.getOrganisationsInPostcodeUrlB);

    case "byKeyword":
          return this.getJsonFromAPI(
            this.apiUrl
            + this.getOrganisationsByKeyword
            + value1
            + "/-35.276/149.13/"
            + "3000"
            + this.getOrganisationsInPostcodeUrlB
            + "/1");

    case "byPostCode":
        return this.getJsonFromAPI(
          this.apiUrl
          + this.getOrganisationsInPostcodeUrlA
          + value1
          + this.getOrganisationsInPostcodeUrlB);

    case "all":
        return this.getJsonFromAPI(
          this.apiUrl
          + this.getAllOrganisationsUrl);

    default:
        return this.getJsonFromAPI(
          this.apiUrl
          + this.getAllOrganisationsUrl);
    }
  }

  // Public method called to get a single Org
  getOrganisation(id: number): Observable<Organisation> {
    return this.getJsonFromAPI(
      this.apiUrl
      + this.getSingleOrganisationUrl + id);
      // return this.getJsonFromAPI("/data/detail-sample.json");

  }

    updateSelectedOrganisation (selectedOrganisation){
      this.selectedOrganisation.next(selectedOrganisation);
    }



  // Using the url, get the response from the API,
  // map through it to extract the data and catch any errors
  private getJsonFromAPI (url) {
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  // Return the body of the json file
  // NOTE: there is no value after "body ||",
  // if we wanted the 'data' object we would put it here after the ||
  // e.g. 'return body || data { };'
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = error.message || error.statusText || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }



}
