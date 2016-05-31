import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { ProviderType }   from './provider-type';

@Injectable()
export class ProviderTypesService {

  constructor (private http: Http) {}

  /*  
  *************************************
  * API Calls
  *************************************
  */

  // All Provider Types (URL) (800ms on average)
  private getAllProviderTypesUrl =
    'http://finder.dss.gov.au/disability/ndap/api/utilities/getallprovidertypes/NDAP';


  /*  
  *************************************
  * Methods that the Service returns
  *************************************
  */

  // Get all Types
  getProviderTypes(): Observable<ProviderType[]> {
    return this.http.get(this.getAllProviderTypesUrl)
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
