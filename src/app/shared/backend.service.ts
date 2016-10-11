import {Injectable, Inject} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { Organisation }   from '../organisations/organisation';
import { AnalyticsService } from './index';
import { AppState } from '../app.service';

import { ProviderType }   from '../search/search-categories/provider-type';


@Injectable()
export class BackendService {

    // http:Http;

    constructor(
            private http: Http,
              @Inject('API_URL') private apiUrl: string,
              public appState: AppState,
              public analytics: AnalyticsService)  {
        // this.http = http;
    }

    getAllOrganisations(): Observable<Organisation[]> {
        // return this.http.get('/todo');
        return this.getOrganisations('all', null, null);
    }

  public getOrganisations(searchType, value1, value2): Observable<Organisation[]> {


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
          + this.getOrganisationsInPostcodeUrlB 
          +  "/-35.276/149.13/1/1");

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
  public getOrganisation(id: number): Observable<Organisation> {
    this.analytics.sendEvent('Select', 'Organisation', id, null, null);
 
    return this.getJsonFromAPI(
      this.apiUrl
      + this.getSingleOrganisationUrl + id);

 
      // return this.getJsonFromAPI("/data/detail-sample.json");

  }


    // Using the url, get the response from the API,
  // map through it to extract the data and catch any errors
  private getJsonFromAPI (url) {
    var sendTime = new Date();

    return this.http.get(url)
                    // .cache()
                    // .retryWhen(error => error.delay(500))
                    // .timeout(2000, return new Error('delay exceeded'))
                    .map((res) => { 
                      var endTime = new Date();
                      var milliseconds = (endTime.getTime() - sendTime.getTime());
                      this.analytics.sendTiming('API', url, milliseconds, null, null);
                      return this.extractData(res);
                    })
                    .catch((error) => { 
                      console.error('from getJsonFromAPI', error);
                        return this.handleError(error); 
                      });
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
    this.analytics.sendException(errMsg, false);
    return Observable.throw(errMsg);
    // error.json().error || 'Server error'
  }

    // saveTodo(newTodo: Todo) : Observable<List<Todo>> {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json; charset=utf-8');

    //     return this.http.post('/todo', JSON.stringify(newTodo.toJS()),{headers}).share();
    // }

    // deleteTodo(deletedTodo: Todo) {
    //     let params = new URLSearchParams();
    //     params.append('id', '' + deletedTodo.id );

    //     return this.http.delete('/todo', {search: params}).share();
    // }


    // toggleTodo(toggled: Todo) {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json; charset=utf-8');
    //     return this.http.put('/todo', JSON.stringify(toggled.toJS()),{headers}).share();
    // }



  // Get all Provider Types
  public getProviderTypes(): Observable<ProviderType[]> {
    return this.http.get(this.apiUrl + this.getAllProviderTypesUrl)
                    .share()
                    .cache()
                    .map(this.extractData)
                    .catch(this.handleError);
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
    // '/api/provider/getallbypostcode/'
    '/api/provider/getallbyserviceareapostcode/'

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


  /*
  *************************************
  * Provider Type API Calls
  *************************************
  */

  // All Provider Types (URL) (800ms on average)
  private getAllProviderTypesUrl =
    '/api/utilities/getallprovidertypes/NDAP';



}


export var backendServiceInjectables: Array<any> = [
  	{ provide: BackendService, useClass: BackendService }
];