// / <reference path="../../../typings/index.d.ts" />
import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

import { NDAPMarker } from '../shared/ndap-marker-interface';
import {MapsAPILoader} from './loading/maps-api-loader';

// import 'markerclustererplus';
declare var MarkerClusterer: any;

// todo: add types for this
declare var google: any;


@Injectable()
export class MapService {

  private defaultCentreLat = -29;
  private defaultCentreLng = 135;
  private defaultZoom = 4;

  private areaMap: google.maps.Map;
  private detailMap: google.maps.Map;
  private infoWindow: google.maps.InfoWindow;
  private markerSelectedSource = new Subject<string>();
  private areaMarkers = Object.create(null);
  // private areaMarkers = [];
  markerSelected$ = this.markerSelectedSource.asObservable();

  private _map: Promise<google.maps.Map>;
  private _mapResolver: (value?: google.maps.Map) => void;
  private _detailmap: Promise<google.maps.Map>;
  private _detailmapResolver: (value?: google.maps.Map) => void;
  private _markers: google.maps.Marker[];
  private _markerCluster: any;

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


  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject('MAPS_API_KEY') private apiKey: string,
              private _loader: MapsAPILoader,
              private zone: NgZone) {

      this._map = new Promise<google.maps.Map>((resolve: () => void) => { this._mapResolver = resolve; });
      this._detailmap = new Promise<google.maps.Map>((resolve: () => void) => { this._detailmapResolver = resolve; });
      this._markers = [];
    //retrieve apikey
    // this.loadAPI();
    // this.styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
  }

  createMap(mapDomElement: any): Promise<void> {
      return this._loader.load().then(() => {
        const map = new google.maps.Map(mapDomElement, this.mapProp);
        this._mapResolver(<google.maps.Map>map);
        return;
      });
    }

    setMapOptions(options: google.maps.MapOptions) {
        this._map.then((m: google.maps.Map) => { m.setOptions(options); });
      }


  createAreaMap(mapDomElement: any, data: NDAPMarker[]): Promise<void> {

    return this._loader.load().then(() => {

      const map = new google.maps.Map(mapDomElement, this.mapProp);
      this._mapResolver(<google.maps.Map>map);


      // this.areaMarkers = Object.create(null);
      // this.areaMap = new google.maps.Map(mapDomElement, this.mapProp);
      // this._mapResolver(<google.maps.Map>this.areaMap);


      // let bounds = this.addAreaMarkers(this.areaMap, data);
      // this.areaMap.fitBounds(bounds);
      // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
      // let styledMapType = new google.maps.StyledMapType([{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]);
      // this.areaMap.mapTypes.set('styled_map', styledMapType);
      // this.areaMap.setMapTypeId('styled_map');

      return;
    });
  }

  AddMarkers(data: NDAPMarker[]) {

    this._map.then((map: google.maps.Map) => {
      this.clearAllMarkers();
      this.addAreaMarkers(data);
      // let bounds = this.addAreaMarkers(data);
      // map.fitBounds(bounds);
      // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
      // let styledMapType = new google.maps.StyledMapType([{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]);
      // this.areaMap.mapTypes.set('styled_map', styledMapType);
      // this.areaMap.setMapTypeId('styled_map');


    });
  }

  /**
   * Creates a google map marker with the map context
   */
  // createMarker(options: mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):
  //     Promise<mapTypes.Marker> {
  //   return this._map.then((map: mapTypes.GoogleMap) => {
  //     options.map = map;
  //     return new google.maps.Marker(options);
  //   });
  // }



  createDetailMap(mapDomElement: any): Promise<void> {

    return this._loader.load().then(() => {

      const detailmap = new google.maps.Map(mapDomElement, this.mapProp);
      this._detailmapResolver(<google.maps.Map>detailmap);
      //
      // this.detailMap = new google.maps.Map(mapDomElement, this.mapProp);
      // this._mapResolver(<google.maps.Map>this.detailMap);

      // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
      let styledMapType = new google.maps.StyledMapType([{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}]);
      detailmap.mapTypes.set('styled_map', styledMapType);
      detailmap.setMapTypeId('styled_map');



      return;
    });
  }

  addDetailMarker(data: NDAPMarker){

    return this._detailmap.then((map: google.maps.Map) => {

      // this.detailMap = new google.maps.Map(mapDomElement, this.mapProp);

      this.addMarker(map, data);
      // let bounds = this.addMarker(data);
      let latLng = new google.maps.LatLng(data.Lat, data.Lng);
      map.setCenter(latLng);
      map.setZoom(15);


    });
}

private clearAllMarkers() {
  console.debug('clear all markers');
  // Clear marker cluster
  if (this._markerCluster) {
    this._markerCluster.setMap(null);
  }

  //Clear markers
  if (this._markers){
    this._markers.map( marker => marker.setMap(null) );
  }
  this._markers = [];

}

  private addAreaMarkers(data: NDAPMarker[]) {
    this._map.then((map: google.maps.Map) => {
      let bounds = new google.maps.LatLngBounds();

      let service = this;
      // let markers: google.maps.Marker[] = [];
      this._markers = [];
      var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
      for (let item of data) {
        let latLng = new google.maps.LatLng(item.Lat, item.Lng);
        let markerOptions: google.maps.MarkerOptions = {
          position: latLng,
          icon: {
            url: isIE11 ? "assets/images/map/Infos_info.png" : "assets/images/map/Infos_info.svg",
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
        // markers.push(result);
        this._markers.push(result);
        bounds.extend(latLng);
      }
      let options: any = {
        imagePath: 'assets/images/markerplus/m'
      }
      this._markerCluster = new MarkerClusterer(map, this._markers, options);
      map.fitBounds(bounds);
      if (data.length < 1){
        map.setCenter({lat: this.defaultCentreLat, lng: this.defaultCentreLng});
        map.setZoom(this.defaultZoom);
      }else if (data.length == 1){
        map.setZoom(16);
      }
      return bounds;
    });
  }

  private addMarker(map: google.maps.Map, item: NDAPMarker){
    // this._map.then((map: google.maps.Map) => {
        let latLng = new google.maps.LatLng(item.Lat, item.Lng);
        var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
        let markerOptions: google.maps.MarkerOptions = {
          position: latLng,
          map: map,
          icon: {
            url: isIE11 ? "assets/images/map/Infos_default.png" : "assets/images/map/Infos_default.svg",
            scaledSize: new google.maps.Size(64, 64)
          }};
        let result = new google.maps.Marker(markerOptions);
        result.set('orgId', item.Id);
        result.set('orgName', item.Name);
        return result;
      // });
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
    console.log('load Google Maps API');
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = "//maps.googleapis.com/maps/api/js?key=" + this.apiKey;
    this.document.body.appendChild(script);
  }
}
