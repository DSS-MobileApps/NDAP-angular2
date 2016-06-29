/// <reference path="../../../typings/index.d.ts" />
/*

This map component provides the Google Map UI
with the markers of the organisations returned by the search results

This component works as follows:
- Defines an array of markers, initially empty
- Subscribes to the OrganisationService for any updates to the Organisations Search Results
- If the results change then update the list of markers

*/

import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { MapService } from './map.service';
import { OrganisationService } from '../organisations/organisation.service';
import { Organisation } from '../organisations/organisation';

import { GeolocationService } from '../shared/geolocation.service';


@Component({
  moduleId: module.id,
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  //directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: ElementRef;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  currentMarker: google.maps.Marker;
  currentMarkerOptions: google.maps.MarkerOptions;
  // default lat/long focus of the map
  lat: number = -33.7711375;
  lng: number = 151.0802965;

  locationPos: any;

  // Create an array of Organisations and initiate as empty
  organisations: Organisation[] = [];

  // Label for the google maps (to be removed when there is an icon)
  labelForMarker: 'O';

  // The Org Id of the currently selected record
  selectedOrganisation: Organisation = null;

  constructor(
    private organisationService: OrganisationService,
    private geolocationService: GeolocationService,
    private mapService: MapService
    ) {}

  // When the component starts
  ngOnInit () {
    // Subscribes to the list of search results of the providers
    this.subscribeToOrganisationListUpdates();

    // Subscribes to any updates to the selected provider record
    // These come from either the the marker on the map or the provider details tiles
    this.subscribeToSelectedOrganisationUpdates();

    // Subscribes to the geolocation position updates
    this.subscribeToPositionUpdates();

  }

  subscribeToOrganisationListUpdates() {
    this.organisationService.orgListSource$
    .subscribe(
      organisations => {
        // set the map.comp Org Array to match the results
        this.organisations = organisations;
        // convert the lat/lng to number for google api to work
        //this.convertOrgArrayLatLngStringToNum(organisations);
        this.mapService.createAreaMap(this.mapElement.nativeElement, this.organisations);
      },
      error =>  console.log(error));
  }


  // As the JSON that comes in has the lat and lng as strings, this is to convert them to Number
  // TODO - put this into the service
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

  ngAfterViewInit() {
    //need to make sure the organisations are available...
    //this.initMap();
  }

  initMap() {
    this.mapService.createAreaMap(this.mapElement.nativeElement, this.organisations);
  }

    //this.markerService.createMarker(this.map);
 

  subscribeToPositionUpdates() {
    this.geolocationService.location$.subscribe(
          (position) => {
            console.log("map position updated: " + new Date());
            this.locationPos = position;
        },
      error => console.log(error));

  }
}
