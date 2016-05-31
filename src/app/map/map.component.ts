import { Component, OnInit } from '@angular/core';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import { Marker } from './marker'

@Component({
  moduleId: module.id,
  selector: 'mapComponent',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class MapComponent implements OnInit {
  lat: number = 50;
  lng: number = 8;

  markers: Marker[] =
    [{
      lat: 50,
      lng: 8,
      label: 'A'
    }];

  testMarker: Marker = 
    {
      lat: 50.001,
      lng: 8.001,
      label: 'B'
    };


  constructor() {}

  // When the component starts
  ngOnInit () {
  }

  updateLatLong (lat: number, lng: number) {

  }
  
  addTestMarker(){
    console.log("button pushed");
    
    this.markers.push(    
      {
      lat: 50.001,
      lng: 8.001,
      label: 'B'
    });
    console.log(this.markers);
  }
}
