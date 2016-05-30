import { Component, OnInit } from '@angular/core';

import { Organisation } from '../organisations/organisation';
import { OrganisationService } from '../organisations/organisation.service';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

@Component({
  moduleId: module.id,
  selector: 'mapComponent',
  // templateUrl: 'map.component.html',
  // styleUrls: ['map.component.css']
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  // the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: `
    <h1>My first angular2-google-maps app!</h1>

    <!-- this creates a google map on the page with the given lat/lng from the component as the initial center of the map: -->

    <sebm-google-map [latitude]="lat" [longitude]="lng">
    </sebm-google-map>
  `


})

export class MapComponent implements OnInit {
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    private organisationService: OrganisationService
  ) 
  {}

  // When the component starts
  ngOnInit () {

  }
}
