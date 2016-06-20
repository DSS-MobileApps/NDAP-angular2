import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { GeolocationService } from '../../shared/geolocation.service';

import {ngSelectLocation, EmitterService} from '../../shared/ng2-location/browser-location';
// import {nglocationService} from '../../shared/ng2-location/browser-location-service';

@Component({
  moduleId: module.id,
  selector: 'search-location',
  templateUrl: 'search-location.component.html',
  styleUrls: ['search-location.component.css'],
  directives:[ngSelectLocation],
  providers: [EmitterService]
})
export class SearchLocationComponent implements OnInit {
  radiuslist: number[];
  errorMessage: string;
  userPosition: any;

  public selectedCity:any;


  // Output that a provider type has been selected
  @Output() onSelectedRadius = new EventEmitter<string>();

  constructor(
    private router: Router,
    private EmitterService: EmitterService
    // private _ngLocation: nglocationService
    // private geolocationService: GeolocationService
  ) {

  }

  ngOnInit() {
    this.radiuslist = [20, 50, 100, 250, 500, 1000];

    // this.geolocationService.getLocation(
    //     // organisations => this.organisations = organisations,
    //     returnPos => this.userPosition = returnPos,
    //     error =>  this.errorMessage = <any>error);

    EmitterService.get("selectedCity").subscribe(data =>{
       this.selectedCity = data;
       localStorage.setItem('city', data);
    });



  }

  // When a radius is selected, tell the org list to filter by the radius selected
  onSelect(radius) {
    // emit the radius value e.g. "50"
    this.onSelectedRadius.emit(radius);


  }

}
