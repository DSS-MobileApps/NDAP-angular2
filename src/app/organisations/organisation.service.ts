import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ProviderType } from '../categories/provider-type';

import { Organisation }   from './organisation';

@Injectable()
export class OrganisationService {

  constructor (private http: Http) {}

  // ************************************
  // API CALLS
  // ************************************

  // All Organisations (URL) (800ms on average)
  private getAllOrganisationsUrl =
    'http://finder.dss.gov.au/disability/ndap/api/provider/getall/all/NDAP';

  // Single Organisation (URL + id) (60ms on average)
  private getSingleOrganisationUrl =
    'http://finder.dss.gov.au/disability/ndap/api/provider/';

  // Organisation (URL + postcode) (60ms on average)
  private getOrganisationsInPostcodeUrlA =
    'http://finder.dss.gov.au/disability/ndap/api/provider/getallbypostcode/'

  private getOrganisationsInPostcodeUrlB =
    '/NDAP'

  // Get suburbs from a postcode
  //'http://finder.dss.gov.au/disability/ndap/api/location/';

  // Get by State
  // http://finder.dss.gov.au/disability/ndap/api/provider/getallbystate/ACT/NDAP

  // Get all by Provider Type
  private getOrganisationsFilteredByTypeUrlA =
    'http://finder.dss.gov.au/disability/ndap/api/provider/getallbytype/';

  private getOrganisationsFilteredByTypeUrlB =
      '/NDAP';

  // Get Provider Types
  // http://finder.dss.gov.au/disability/ndap/api/utilities/getallprovidertypes/NDAP

  // Get by name
  // ????

  // Get within a shape
  // http://finder.dss.gov.au/disability/ndap/api/provider
  // /GetAllWithinShape/-36.037825426409505/148.3338165283203/

  // Get within a distance
  // http://finder.dss.gov.au/disability/ndap/api/provider/GetAllByDistance/-35.276/149.13/300


  // ************************************
  // Methods that the Service returns
  // ************************************

  // TODO - add other methods
  // TODO - refactor the get.map.catch so it doesnt repeat for each method (DRY)

  // Main Method called to get organisations list

  getOrganisations(searchType, value1, value2): Observable<Organisation[]> {
    switch (searchType) {

    case "byProviderType":
      return this.getJsonFromAPI(
        this.getOrganisationsFilteredByTypeUrlA
        + value1.Code
        + this.getOrganisationsFilteredByTypeUrlB);

    case "byPostCode":
        return this.getJsonFromAPI(
          this.getOrganisationsInPostcodeUrlA
          + value1
          + this.getOrganisationsInPostcodeUrlB);

    case "all":
        return this.getJsonFromAPI(this.getAllOrganisationsUrl);

    default:
        return this.getJsonFromAPI(this.getAllOrganisationsUrl);
    }
  }

  // Get a single Org
  getOrganisation(id: number): Observable<Organisation> {
    return this.getJsonFromAPI(this.getSingleOrganisationUrl + id);
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
