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

  // Create an array of Organisations and initiate as empty
  organisations: Organisation[] = [];

  // Label for the google maps (to be removed when there is an icon)
  labelForMarker: 'O';

  // The Org Id of the currently selected record
  selectedOrganisation: Organisation = null;

  constructor(
    private organisationService: OrganisationService
    ) {}

  // When the component starts
  ngOnInit () {
    this.subscribeToOrganisationListUpdates();
    this.subscribeToSelectedOrganisationUpdates();
  }

  subscribeToOrganisationListUpdates() {
    this.organisationService.orgListSource$
    .subscribe(
      organisations => {
        // set the map.comp Org Array to match the results
        this.organisations = organisations;
        // convert the lat/lng to number for google api to work
        this.convertOrgArrayLatLngStringToNum(organisations);
      },
      error =>  console.log(error));
  }

  convertOrgArrayLatLngStringToNum(organisation: Organisation[]) {
    return organisation = organisation.map(org => {
      org.Lat = Number(org.Lat);
      org.Lng = Number(org.Lng);
      return org;
    });
  }

  // When a marker is clicked, tell the Org Service
  clickedMarker(selectedOrganisation) {
    this.organisationService.updateSelectedOrganisation(selectedOrganisation);
  };

  // Be notified when a organisation is selected
  subscribeToSelectedOrganisationUpdates() {
  this.organisationService.selectedOrganisation$
    .subscribe(
      selectedOrganisation => this.selectedOrganisation = selectedOrganisation,
      error =>  console.log(error));
    }
}
