import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { GeolocationService } from '../../shared/geolocation.service';
// import { GeoLocation } from '../../shared/geolocation-interface';
import {GeolocationService, GeoLocation} from '../../shared/index';

@Component({
  
  selector: 'search-location',
  templateUrl: 'search-location.component.html',
  styleUrls: ['search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  radiuslist: number[];
  errorMessage: string;
  userPosition: any;

  public selectedCity:any;

  private subLocation: any;

  // public location: Location;
  locationPos: GeoLocation;
  @Input() locatingPosition: boolean = false;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
          }


  // Output that a provider type has been selected
  @Output() onSelectedRadius = new EventEmitter<string>();
  @Output() onLocationPostcodeSearch = new EventEmitter<any>();

  constructor(
    private router: Router,
    private geolocationService: GeolocationService
  ) {

  }

  ngOnInit() {
    // this.radiuslist = [20, 50, 100, 250, 500, 1000];

    this.subLocation = this.geolocationService.location$.subscribe(
          (position) => {
            console.log("search-location menu position updated: " + new Date());
            this.locationPos = position;
            this.locatingPosition = false;
            // this.onCurrentPostcodeSearch(this.locationPos.postcode)
        },
      error => {
        console.log(error);
        this.locatingPosition = false;
      });

  }

  ngOnDestroy(){
    if (this.subLocation) { this.subLocation.unsubscribe();}
  }

  // Get location from browser / device
  onGetCurrentLocation() {
    this.locatingPosition = true;
    this.geolocationService.getLocation(this.opts);
  }

  SearchCurrentLocation(){
    this.onGetCurrentLocation();
  }

  // When a radius is selected, tell the org list to filter by the radius selected
  onSelect(radius) {
    // emit the radius value e.g. "50"
    this.onSelectedRadius.emit(radius);


  }

  onCurrentPostcodeSearch (postCode) {
    // this.organisationService.searchOrgList('byPostCode', postCode, undefined);
    console.log('search for postcode: ' + postCode);
    this.onLocationPostcodeSearch.emit(postCode);

  }


}
