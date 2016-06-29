/// <reference path="../../../typings/index.d.ts" />
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NDAPMarker } from '../shared/ndap-marker-interface';

@Injectable()
export class MapService {
  private map: google.maps.Map;
  private infoWindow: google.maps.InfoWindow;
  private markerSelectedSource = new Subject<string>();
  //private apiKey: string;

  markerSelected$ = this.markerSelectedSource.asObservable();

  constructor(private window: Window, private document: Document, @Inject('MAPS_API_KEY') private apiKey: string) {
    //retrieve apikey
    this.loadAPI();
  } 

  createAreaMap(mapDomElement: any, data: NDAPMarker[]) {
    this.map = new google.maps.Map(mapDomElement);
    let bounds = this.addMarkers(this.map, data);
    
    this.map.fitBounds(bounds);
  }

  createDetailMap(mapDomElement: any, data: NDAPMarker) {
    this.map = new google.maps.Map(mapDomElement);
    let bounds = this.addMarkers(this.map, [data]);
    let latLng = new google.maps.LatLng(data.Lat, data.Lng);
    this.map.setCenter(latLng);
    this.map.setZoom(15);
  }

  //TODO: Need to create an common interface for objects containing marker data, e.g. lat, lng, label, etc. Then we can get rid of 'any'
  private addMarkers(map: google.maps.Map, data: any[]) : google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();
    let service = this; 
    for (let item of data) {
      let latLng = new google.maps.LatLng(item.Lat, item.Lng);
      let markerOptions: google.maps.MarkerOptions = {position: latLng, map: map};
      let result = new google.maps.Marker(markerOptions);
      result.set('orgId', item.Id);
      result.set('orgName', item.Name);
      result.addListener('click', function() {
        service.selectMarkerInternal(result);
      });
      bounds.extend(latLng);
    }
    return bounds;
  }

  selectMarker(id: string) {
    this.markerSelectedSource.next(id);
  }

  private selectMarkerInternal(marker: google.maps.Marker) {
    this.selectMarker(marker.get('orgId'));
    this.showInfoWindow(marker);
  }

  private showInfoWindow(marker: google.maps.Marker) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    let content = '<div class="infowindow-html"><a class="col-xs-11 col-xs-push-1" >' + marker.get('orgName') + '</a><a class="btn btn-link btn-xs col-xs-1 col-xs-pull-11"><i class="fa fa-info-circle fa-lg"></i></a></div>';
    this.infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 200
    });
    this.infoWindow.open(this.map, marker);
  }

  private loadAPI() {
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.apiKey;
    this.document.body.appendChild(script);
  }
}