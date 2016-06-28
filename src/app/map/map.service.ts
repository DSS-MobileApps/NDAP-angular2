/// <reference path="../../../typings/index.d.ts" />
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {
  map: google.maps.Map;
  constructor() { }

  createMap(mapDomElement: any, data: any[]) {
    this.map = new google.maps.Map(mapDomElement);
    let bounds = this.addMarkers(this.map, data);
    
    this.map.fitBounds(bounds);
  }

  //TODO: Need to create an common interface for objects containing marker data, e.g. lat, lng, label, etc. Then we can get rid of 'any'
  private addMarkers(map: google.maps.Map, data: any[]) : google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();
     
    for (let item of data) {
      let latLng = new google.maps.LatLng(item.Lat, item.Lng);
      let markerOptions: google.maps.MarkerOptions = {position: latLng, map: map};
      let result = new google.maps.Marker(markerOptions);
      bounds.extend(latLng);
    }

    return bounds;
  }
}