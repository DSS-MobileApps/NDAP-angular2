import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GeolocationService } from '../../shared/geolocation.service';
import { GeoLocation } from '../../shared/geolocation-interface';

@Component({
  moduleId: module.id,
  selector: 'search-location',
  templateUrl: 'search-location.component.html',
  styleUrls: ['search-location.component.css'],
})
export class SearchLocationComponent implements OnInit {
  radiuslist: number[];
  errorMessage: string;
  userPosition: any;

  public selectedCity:any;

  // public location: Location;
  locationPos: GeoLocation;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
          }


  // Output that a provider type has been selected
  @Output() onSelectedRadius = new EventEmitter<string>();

  constructor(
    private router: Router,
    private geolocationService: GeolocationService
  ) {

  }

  ngOnInit() {
    this.radiuslist = [20, 50, 100, 250, 500, 1000];

    this.geolocationService.location$.subscribe(
          (position) => {
            console.log("search-location menu position updated: " + new Date());
            this.locationPos = position;
        },
      error => console.log(error));

  }

  // When a radius is selected, tell the org list to filter by the radius selected
  onSelect(radius) {
    // emit the radius value e.g. "50"
    this.onSelectedRadius.emit(radius);


  }


}
