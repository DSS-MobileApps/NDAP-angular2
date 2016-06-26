import {Injectable, provide} from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { GeoLocation }    from './geolocation-interface';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeolocationService {

	/**
	 * Obtains the geographic position, in terms of latitude and longitude coordinates, of the device.
	 * @param {Object} [opts] An object literal to specify one or more of the following attributes and desired values:
	 *   - enableHighAccuracy: Specify true to obtain the most accurate position possible, or false to optimize in favor of performance and power consumption.
	 *   - timeout: An Integer value that indicates the time, in milliseconds, allowed for obtaining the position.
	 *              If timeout is Infinity, (the default value) the location request will not time out.
	 *              If timeout is zero (0) or negative, the results depend on the behavior of the location provider.
	 *   - maximumAge: An Integer value indicating the maximum age, in milliseconds, of cached position information.
	 *                 If maximumAge is non-zero, and a cached position that is no older than maximumAge is available, the cached position is used instead of obtaining an updated location.
	 *                 If maximumAge is zero (0), watchPosition always tries to obtain an updated position, even if a cached position is already available.
	 *                 If maximumAge is Infinity, any cached position is used, regardless of its age, and watchPosition only tries to obtain an updated position if no cached position data exists.
	 * @returns {Observable} An observable sequence with the geographical location of the device running the client.
	 */

	 public location = new Subject<GeoLocation>() ;

	 // Observable string streams
	location$ = this.location.asObservable();

	private loc: GeoLocation;


	constructor( public http: Http) {}

	public getLocation(opts) {

		// return Observable.create(observer => {

			if (window.navigator && window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(
					this.displayLocation,
					this.positionErrorCallback,
					opts);
			}
			else {
				console.log("browser geoloation position not supported");
				this.location.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}

		// });

	}

	positionSuccessCallback =	(position) => {
			// this.location.next(position);
			this.displayLocation(position);

			// this.location.complete();
		}

		positionErrorCallback = (error) => {
			console.group("Geolocation error");
			console.log("position error: " + new Date());
			console.error(error);
			console.groupEnd();

			var loc = new GeoLocation();
			loc.valid = false;

			switch (error.code) {
				case 1:
					// this.location.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
					loc.error = GEOLOCATION_ERRORS['errors.location.permissionDenied'];
					break;
				case 2:
					// this.location.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
					loc.error = GEOLOCATION_ERRORS['errors.location.positionUnavailable'];
					break;
				case 3:
					// this.location.error(GEOLOCATION_ERRORS['errors.location.timeout']);
					loc.error = GEOLOCATION_ERRORS['errors.location.timeout'];
					break;
			}

			this.location.next(loc);

		}

		displayLocation = (position) => {

			var loc = new GeoLocation();
			loc.valid = false;
			loc.position = position;
			loc.latitude = position.coords.latitude;
			loc.longitude = position.coords.longitude;

      this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+loc.latitude+','+loc.longitude+'&sensor=true')
        .subscribe(
          response => {

              if(response.status == 200){
                  let data = response.json();
                  loc.address =  data.results[0].formatted_address

                  let city = data.results[0].address_components.reduce((city, value) => {
                     if (value.types[0] == "locality") {
                           city = value.long_name;
                           loc.city = city;
                      }
                     if (value.types[0] == "postal_code") {
                            let postal_code = value.long_name;
                            loc.postcode = postal_code;
														loc.valid = true;
                        }
                    // return loc;


                  }, '');
									console.group("Geolocation update");
									console.log("position updated: " + new Date());
									console.log(loc);
									console.groupEnd();

									this.location.next(loc);

              }
              // localStorage.setItem('location', JSON.stringify(location));
              // EmitterService.get("selectedCity").emit(location['city']);

      },
        error => {
        console.error(error.text());
				loc.error = error;
				this.location.next(loc);
				// return loc;
      }
      );


    };

	// public getLocation(opts): Observable<any> {
	//
	// 	return Observable.create(observer => {
	//
	// 		if (window.navigator && window.navigator.geolocation) {
	// 			window.navigator.geolocation.getCurrentPosition(
	// 				(position) => {
	// 					observer.next(position);
  //           observer.complete();
	// 				},
	// 				(error) => {
	// 					switch (error.code) {
	// 						case 1:
	// 							observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
	// 							break;
	// 						case 2:
	// 							observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
	// 							break;
	// 						case 3:
	// 							observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
	// 							break;
	// 					}
	// 				},
	// 				opts);
	// 		}
	// 		else {
	// 			observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
	// 		}
	//
	// 	});
	//
	// }

	// public updatePosition (opts){
	// 	this.getLocation(opts);
	// }

}

export var geolocationServiceInjectables: Array<any> = [
  provide(GeolocationService, { useClass: GeolocationService })
];
