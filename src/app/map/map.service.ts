/// <reference path="../../../typings/index.d.ts" />
import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

import { NDAPMarker } from '../shared/ndap-marker-interface';

import 'markerclustererplus';
declare var MarkerClusterer: any;

@Injectable()
export class MapService {
  private areaMap: google.maps.Map;
  private detailMap: google.maps.Map;
  private infoWindow: google.maps.InfoWindow;
  private markerSelectedSource = new Subject<string>();
  private areaMarkers = Object.create(null);
  markerSelected$ = this.markerSelectedSource.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document, @Inject('MAPS_API_KEY') private apiKey: string, private zone: NgZone) {
    //retrieve apikey
    this.loadAPI();
  }

  createAreaMap(mapDomElement: any, data: NDAPMarker[]) {
    this.areaMarkers = Object.create(null);
    this.areaMap = new google.maps.Map(mapDomElement);
    let bounds = this.addAreaMarkers(this.areaMap, data);
    this.areaMap.fitBounds(bounds);
  }

  createDetailMap(mapDomElement: any, data: NDAPMarker) {
    this.detailMap = new google.maps.Map(mapDomElement);
    let bounds = this.addMarker(this.detailMap, data);
    let latLng = new google.maps.LatLng(data.Lat, data.Lng);
    this.detailMap.setCenter(latLng);
    this.detailMap.setZoom(15);
  }

  private addAreaMarkers(map: google.maps.Map, data: NDAPMarker[]) : google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();
    let service = this;
    let markers: google.maps.Marker[] = [];
    for (let item of data) {
      let latLng = new google.maps.LatLng(item.Lat, item.Lng);
      let markerOptions: google.maps.MarkerOptions = {position: latLng};
      let result = new google.maps.Marker(markerOptions);
      result.set('orgId', item.Id);
      result.set('orgName', item.Name);
      result.addListener('click', function() {
        service.selectMarkerInternal(result);
      });
      this.areaMarkers[item.Id] = result;
      markers.push(result);
      bounds.extend(latLng);
    }
    let options: any = {
      imagePath: 'vendor/markerclustererplus/images/m'
    }
    var markerCluster = new MarkerClusterer(this.areaMap, markers, options);
    return bounds;
  }

  private addMarker(map: google.maps.Map, item: NDAPMarker): google.maps.Marker {
    let latLng = new google.maps.LatLng(item.Lat, item.Lng);
    let markerOptions: google.maps.MarkerOptions = {position: latLng, map: map};
    let result = new google.maps.Marker(markerOptions);
    result.set('orgId', item.Id);
    result.set('orgName', item.Name);
    return result;
  }

  selectMarker(id: string) {
    let marker: google.maps.Marker = this.areaMarkers[id];
    this.selectMarkerInternal(marker);

  }

  private selectMarkerInternal(marker: google.maps.Marker) {
    this.zone.run(() => {
      this.markerSelectedSource.next(marker.get('orgId'));
      this.showInfoWindow(marker);
    });
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
    this.infoWindow.open(marker.getMap(), marker);
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
