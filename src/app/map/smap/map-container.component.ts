import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

// import { OrganisationService } from '../../organisations/organisation.service';
import { Organisation } from '../../organisations/organisation';

// import { GeolocationService } from '../../shared/geolocation.service';

import { GoogleMapsAPIWrapper, SebmGoogleMap, LatLng, LatLngLiteral, LatLngBounds, LatLngBoundsLiteral } from 'angular2-google-maps/core';
import * as mapTypes from 'angular2-google-maps/core/services/google-maps-types';

declare var MarkerClusterer: any;
declare var google: any;


@Component({
  selector: 'app-smap-container',
  template: `<sebm-google-map #map [latitude]="defaultCentreLat"
                    [longitude]="defaultCentreLng"
                    [zoom]="defaultZoom"
                    (mapClick)="mapClicked($event)"
                    class="map-container">
                    <app-smap [organisations]="organisations" [selectedOrganisation]="selectedOrganisation"></app-smap>
              </sebm-google-map>`,
  styleUrls: ['./smap.component.css']
})
export class SmapContainerComponent implements OnInit {

  @ViewChild('map') mapElement: SebmGoogleMap;

  // default lat/long focus of the map
  private defaultCentreLat : number = -29;
  private defaultCentreLng : number = 135;
  private defaultZoom : number = 4;

  private latLng : LatLng;
  private mapBounds : LatLngBounds;

  // organisations: Organisation[] = [
  //   {
  //     Id: 1,
  //   Lat: -33.7711375,
  //   Lng: 151.0802965,
  //   Name: 'Some marker'
  // },
  // {
  //   Id: 2,
  //   Lat: -33.7711375,
  //   Lng: 151.0802965,
  //   Name: 'Diff marker'
  // }];
  @Input() organisations: Organisation[] = [];
  // markers: marker[] = [];
  // private _markerCluster: any;


  // Label for the google maps (to be removed when there is an icon)
  // labelForMarker: 'O';

  // The Org Id of the currently selected record
  @Input() selectedOrganisation: Organisation = null;

  private subOrgs: any;
  private subSelected: any;
  private subLocation: any;

  // iconUrl = "assets/images/map/Infos_info.svg";

 private _googMap: mapTypes.GoogleMap;

  constructor(
      // private organisationService: OrganisationService,
      // private geolocationService: GeolocationService,
      private _wrapper: GoogleMapsAPIWrapper)
  {
  }

  ngOnInit() {
    console.info('INIT SMapContainerComponent: ', this.organisations);

  }

  ngOnDestroy(){
    if (this.subOrgs) {this.subOrgs.unsubscribe();}
    if (this.subSelected) {this.subSelected.unsubscribe();}
    if (this.subLocation) {this.subSelected.unsubscribe();}
  }



    mapClicked($event: MouseEvent) {
      console.info('clicked map');
        // this.markers.push({
        //   Name: 'Some new marker',
        //   Lat: this.defaultCentreLat,
        //   Lng: this.defaultCentreLng
        // });
      }


}
