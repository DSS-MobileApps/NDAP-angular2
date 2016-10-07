import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { environment } from '../../environments/environment';

// Google analytics tracking
declare let ga:Function;

// const GEOLOCATION_ERRORS = {
// 	'errors.location.unsupportedBrowser': 'Browser does not support location services',
// 	'errors.location.permissionDenied': 'You have rejected access to your location',
// 	'errors.location.positionUnavailable': 'Unable to determine your location',
// 	'errors.location.timeout': 'Service timeout has been reached'
// };

@Injectable()
export class AnalyticsService {

	constructor() {
        if (!environment.production){
            ga('set', 'sendHitTask', null);
        }
        
    }

    sendPageView(url: string){
        ga('send', 'pageview', url);
    }
	
    sendEvent(eventCategory, eventAction, eventLabel?, eventValue?, fieldsObject?){
        // console.log('send event', eventCategory, eventAction, eventLabel, eventValue, fieldsObject);
        ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue, fieldsObject);
    }

    sendUIEvent(eventAction, eventLabel?, eventValue?, fieldsObject?){
        // console.log('send event', eventCategory, eventAction, eventLabel, eventValue, fieldsObject);
        ga('send', 'event', 'UI', eventAction, eventLabel, eventValue, fieldsObject);
    }

    sendTiming(timingCategory, timingVar, milliseconds: number, timingLabel?, fieldsObject?){
        ga('send', 'timing', timingCategory, timingVar, milliseconds, timingLabel, fieldsObject);
    }

    sendPageLoaded(name: string){
        // Feature detects Navigation Timing API support.
        if (window.performance) {
            // Gets the number of milliseconds since page load
            // (and rounds the result since the value must be an integer).
            var timeSincePageLoad = Math.round(performance.now());

            // Sends the timing hit to Google Analytics.
            ga('send', 'timing', name, 'page load time', timeSincePageLoad, window.location.href);
        }
    }

    sendComponentLoaded(name: string, milliseconds: number){
        ga('send', 'timing', name, 'page load time', milliseconds, window.location.href);
    }


    sendException(errMessage?: string, fatal?: boolean){
        ga('send', 'exception', {
            'exDescription': errMessage,
            'exFatal': fatal
        });
    }	

}

export var analyticsServiceInjectables: Array<any> = [
  // provide(GeolocationService, { useClass: GeolocationService })
	{ provide: AnalyticsService, useClass: AnalyticsService }
];
