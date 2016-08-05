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

  private mapProp = {
        // center: new google.maps.LatLng(51.508742,-0.120850),
        zoom:7,
        panControl:false,
        zoomControl:true,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        overviewMapControl:false,
        rotateControl:false,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // private styledMapType: google.maps.StyledMapType;


  constructor(@Inject(DOCUMENT) private document: Document, @Inject('MAPS_API_KEY') private apiKey: string, private zone: NgZone) {
    //retrieve apikey
    this.loadAPI();
    // this.styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
  }

  createAreaMap(mapDomElement: any, data: NDAPMarker[]) {



    this.areaMarkers = Object.create(null);
    this.areaMap = new google.maps.Map(mapDomElement, this.mapProp);
    let bounds = this.addAreaMarkers(this.areaMap, data);
    this.areaMap.fitBounds(bounds);
    // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
    // let styledMapType = new google.maps.StyledMapType([{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]);
    // this.areaMap.mapTypes.set('styled_map', styledMapType);
    // this.areaMap.setMapTypeId('styled_map');

  }

  createDetailMap(mapDomElement: any, data: NDAPMarker) {
    this.detailMap = new google.maps.Map(mapDomElement, this.mapProp);
    let bounds = this.addMarker(this.detailMap, data);
    let latLng = new google.maps.LatLng(data.Lat, data.Lng);
    this.detailMap.setCenter(latLng);
    this.detailMap.setZoom(15);
    // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
    let styledMapType = new google.maps.StyledMapType([{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}]);
    this.detailMap.mapTypes.set('styled_map', styledMapType);
    this.detailMap.setMapTypeId('styled_map');

  }

  private addAreaMarkers(map: google.maps.Map, data: NDAPMarker[]) : google.maps.LatLngBounds {
    let bounds = new google.maps.LatLngBounds();
    let service = this;
    let markers: google.maps.Marker[] = [];
    var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
    for (let item of data) {
      let latLng = new google.maps.LatLng(item.Lat, item.Lng);
      let markerOptions: google.maps.MarkerOptions = {
        position: latLng,
        icon: {
          url: isIE11 ? "images/map/Infos_info.png" : "images/map/Infos_info.svg",
          scaledSize: new google.maps.Size(48, 48)
        }};
      // let markerOptions: google.maps.MarkerOptions = this.markerOpt;
      // markerOptions.position = latLng;
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
    var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
    let markerOptions: google.maps.MarkerOptions = {
      position: latLng,
      map: map,
      icon: {
        url: isIE11 ? "images/map/Infos_default.png" : "images/map/Infos_default.svg",
        scaledSize: new google.maps.Size(64, 64)
      }};
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
    let content = '<div class="infowindow-html"><h4><a href="/organisation/' + marker.get('orgId') + '" class="" >' + marker.get('orgName') + '</a></h4><!--<a class="btn btn-link btn-xs col-xs-1 col-xs-pull-11"><span class="lnr lnr-apartment"></span></a>--></div>';
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
