/*

This map component provides the Google Map UI 
with the markers of the organisations returned by the search results

This component works as follows:
- Defines an array of markers, initially empty
- Subscribes to the OrganisationService for any updates to the Organisations Search Results
- If the results change then update the list of markers

*/

import { Component, OnInit } from '@angular/core';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import { OrganisationService } from '../organisations/organisation.service';
import { Organisation } from '../organisations/organisation';

import { Marker } from './marker'

@Component({
  moduleId: module.id,
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class MapComponent implements OnInit {
  // default lat/long focus of the map
  lat: number = -33.7711375;
  lng: number = 151.0802965;

  // Create an array of Markers and initiate as empty
  markers: Marker[] = [];

  constructor(
    private organisationService: OrganisationService
    ) {}

  // When the component starts
  ngOnInit () {
    this.subscribeToOrganisationListUpdates();
  }

  subscribeToOrganisationListUpdates() {
    this.organisationService.orgListSource$
    .subscribe(
      organisations => this.clearAndAddNewMarkers(organisations),
      error =>  console.log(error));
  }

  clearAndAddNewMarkers(organisations: Organisation[]) {
    // Clear the markers Array
    this.markers = [];

    // For each search result, create a new marker
    organisations.forEach(organisation => {
      this.markers.push({
        lat: Number(organisation.Lat), 
        lng: Number(organisation.Lng), 
        label: 'O'})
      }
    );
  }
}
