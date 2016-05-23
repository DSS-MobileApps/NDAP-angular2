import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

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
  private getOrganisationsInPostcodeUrl =
    'http://finder.dss.gov.au/disability/ndap/api/location/';

  // TODO - add other calls here




  // ************************************
  // Methods that the Service returns
  // ************************************

  // TODO - add other methods
  // TODO - refactor the get.map.catch so it doesnt repeat for each method (DRY)

  // Get all Orgs
  getOrganisations(): Observable<Organisation[]> {
    return this.http.get(this.getAllOrganisationsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Get a single Org
  getOrganisation(id: number): Observable<Organisation> {
    return this.http.get(this.getSingleOrganisationUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

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
