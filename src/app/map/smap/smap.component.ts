import { Component, OnInit, Input, OnChanges, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, NgZone } from '@angular/core';
import { MapService } from '../map.service';

// import { OrganisationService } from '../../organisations/organisation.service';
import { Organisation } from '../../organisations/organisation';

// import { GeolocationService } from '../../shared/geolocation.service';

import { GoogleMapsAPIWrapper, MarkerManager, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, LatLng, LatLngLiteral, LatLngBounds, LatLngBoundsLiteral } from 'angular2-google-maps/core';
import * as mapTypes from 'angular2-google-maps/core/services/google-maps-types';

declare var MarkerClusterer: any;
declare var google: any;


@Component({
  selector: 'app-smap',
  templateUrl: './smap.component.html'
  // styleUrls: ['./smap.component.css']
})
export class SmapComponent implements OnInit, OnChanges {

  // @ViewChild('map') mapElement: SebmGoogleMap;

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
  markers: marker[] = [];
  @ViewChildren('markers') children: QueryList<SebmGoogleMapMarker>;
  @ViewChildren('window') infoWindows: QueryList<SebmGoogleMapInfoWindow>;
  private _markerCluster: any;
  private selectedMarker: any;


  // Label for the google maps (to be removed when there is an icon)
  labelForMarker: 'O';

  // The Org Id of the currently selected record
  @Input() selectedOrganisation: Organisation = null;

  private subOrgs: any;
  private subSelected: any;
  private subLocation: any;

  iconUrl = "assets/images/map/Infos_info.svg";

 private _googMap: mapTypes.GoogleMap;
 private _markerMgr: MarkerManager;

  constructor(
      // private organisationService: OrganisationService,
      // private geolocationService: GeolocationService,
      private _wrapper: GoogleMapsAPIWrapper,
      // private _markerMgr: MarkerManager,
      private ref: ChangeDetectorRef,
      private zone: NgZone)
  {

    this._markerMgr = new MarkerManager(this._wrapper, this.zone);

    var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));

    this.iconUrl = isIE11 ? "assets/images/map/Infos_info.png" : "assets/images/map/Infos_info.svg";

    // this.latLng = LatLng(this.defaultCentreLat, this.defaultCentreLng);
  }

  ngOnInit() {
    console.info('INIT SMapComponent: ', this.organisations);

    // console.info('maps wrapper', this._wrapper);
    // this._wrapper.getNativeMap().then((m: mapTypes.GoogleMap) => {
    //       console.info('got map', m);
    //     });
    // console.log("map ready...");
    this.getNativeMap();

    // this._initMapInstance();

    // Subscribes to the list of search results of the providers
    // this.subscribeToOrganisationListUpdates();
  }

  ngOnDestroy(){
    if (this.subOrgs) {this.subOrgs.unsubscribe();}
    if (this.subSelected) {this.subSelected.unsubscribe();}
    if (this.subLocation) {this.subSelected.unsubscribe();}
  }


  ngAfterViewInit() {
    // children are set
    console.log('markers after view init', this.children);
    if (this._googMap){
      let options: any = {
        imagePath: 'assets/images/markerplus/m'
      }
      this._markerCluster = new MarkerClusterer(this._googMap, this.markers, options);
    }
  }

  ngOnChanges(changes:any):void {
    if (changes.organisations){
        var orgsChange:Organisation[] = changes.organisations.currentValue;
        if (orgsChange) {
          console.info('organisations changed', this.organisations)
          // this.internalModel = new Contact(personChange.id,
          //                                 personChange.firstname,
          //                                 personChange.lastname);
          this.AddMarkers(orgsChange)
        }
    }else if (changes.selectedOrganisation){
      var orgChange:Organisation = changes.selectedOrganisation.currentValue;
      if (orgChange){
        console.info('selected organisation changed', orgChange);
        this.AddMarkers([orgChange]);
      }
    }
  }

  getNativeMap() : Promise<mapTypes.GoogleMap> {
    // call from this.ready().then()
    if (this._googMap) {
      return Promise.resolve(this._googMap)
    }

    // this.myConsole.log(`sebmGoogleMap, keys=${Object.keys(this.sebmGoogMap._mapsWrapper._map)}`);
    // let googMapApiWrapper : GoogleMapsAPIWrapper  = this.mapElement._mapsWrapper;
    // find google.map object

    return this._wrapper.getNativeMap()
    .then( (map: mapTypes.GoogleMap)=> {
      console.log("getNativeMap() resolved");
      // this.myConsole.log(`google.map, keys=${Object.keys(map)}`);
      console.log('native map promise resolved')

      return this._googMap = map;
    })
    .catch( (err)=>{
      console.log("catch GoogleMapsAPIWrapper.getNativeMap()")
      return Promise.reject(err);
    });
  }

  // onSetBounds(){
  //   console.log(`onSetBounds()`)
  //   let bounds = new google.maps.LatLngBounds()
  //   this.markers.forEach( m => {
  //     let point = new google.maps.LatLng(m.Lat, m.Lng);
  //     bounds.extend(point);
  //     })
  //
  //   this.getNativeMap().then( (map: mapTypes.GoogleMap)=> {
  //     map.fitBounds(bounds)
  //   }, (err)=>{
  //     console.log("catch this.getNativeMap()")
  //   });
  //
  //   console.log(`bounds=${bounds}`);
  // }

      AddMarkers(data: Organisation[]){

        this.getNativeMap()
          .then((map: mapTypes.GoogleMap) => {
            console.log('Add Markers for found orgs', data);
            
            this.clearAllMarkers();
            this.addAreaMarkers(map, data);
            // let bounds = this.addAreaMarkers(data);
            // map.fitBounds(bounds);
            // let styledMapType = new google.maps.StyledMapType([{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);
            // let styledMapType = new google.maps.StyledMapType([{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]);
            // this.areaMap.mapTypes.set('styled_map', styledMapType);
            // this.areaMap.setMapTypeId('styled_map');
        });
      }

      private clearAllMarkers() {
        console.debug('clear all markers');
        // Clear marker cluster
        if (this._markerCluster) {
          this._markerCluster.setMap(null);
        }

        //Clear markers
        // if (this.markers){
        //   this.markers.map( marker => marker.setMap(null) );
        // }
        this.markers = [];

      }

      private addAreaMarkers(map: mapTypes.GoogleMap, data: Organisation[]) {
          let bounds = new google.maps.LatLngBounds();
          // let defaultLatLng = new google.maps.LatLng(item.Lat, item.Lng);


          // let service = this;
          // let markers: google.maps.Marker[] = [];
          this.markers = [];

          for (let item of data) {

            this.markers.push({
                Lat: Number(item.Lat),
                Lng: Number(item.Lng),
                Name: item.Name,
                isOpen: false
              });


            let latLng = new google.maps.LatLng(item.Lat, item.Lng);

            bounds.extend(latLng);

          }



          this.ref.detectChanges();
          console.log('markers after adding', this.children.toArray());

          // // Marker cluster
          // let options: any = {
          //   imagePath: 'assets/images/markerplus/m'
          // }
          // this._markerCluster = new MarkerClusterer(map, this.markers, options);
          // var nm = this.children.toArray().map(m =>  this._markerMgr.getNativeMarker(m)) //.then(n => console.log('something', n)) )
          // console.log('nm', nm);

          // this.getNativeMarkers(this.children.toArray())
          //     .then((nm) => {
          //   console.log('nativeMarkers outer: ', nm);
          //   // this._markerCluster = new MarkerClusterer(map, nm, options);
          // },
          // err => { console.log('error in nativeMarker promise: ', err);}
          // );



          if (data.length < 1){
            console.log('No data found, set map to all Aus' ,this.defaultCentreLat, this.defaultCentreLng);
            // map.setCenter({lat: this.defaultCentreLat, lng: this.defaultCentreLng});
            // this._googMap.setCenter(new google.maps.LatLng(this.defaultCentreLat, this.defaultCentreLng));
            map.setZoom(this.defaultZoom);
          }else if (data.length == 1){
            map.fitBounds(bounds);
            console.log('One result found, set map Zoom to show that marker context');
            map.setZoom(16);
          }else{
            map.fitBounds(bounds);

          }
          return bounds;

        // });

      }


      // // Not working yet
      // getNativeMarkers(sebMarkers: SebmGoogleMapMarker[]): Promise<mapTypes.Marker[]>{
        
      //   var markerPromise = new Promise<mapTypes.Marker[]>((resolve, reject) => {
      //     var nmr = sebMarkers.map((m) => {
            
      //       this.getNativeMarker(m)

      //     // console.log('m:',m);

      //     //   that._markerMgr.getNativeMarker(m)
      //     //    .then((nm) => { 
      //     //      console.log('nm', nm);
      //     //     //  resolve(nm);
      //     //     // return nm; 
      //     //     });

              
      //     });

      //   });
      //   return markerPromise;

      // }

      // getNativeMarker(sebmMarker: SebmGoogleMapMarker): Promise<mapTypes.Marker>{
      //   console.log('this is ',this);
      //   var that = this;
      //   return new Promise<mapTypes.Marker>((resolve, reject) => {
      //     console.log('that is ',that);
      //        console.log('m:',sebmMarker);
      //        that._markerMgr.getNativeMarker(sebmMarker)
      //        .then((nm) => { 
      //          console.log('nm', nm);
      //          resolve(nm);
      //         // return nm; 
      //         });
      //   });
      // }



  clickedMarker(label: string, index: number) {
      console.log('clicked the marker: ', label, index)
      // console.log('selected mkr ', this.children.toArray()[index].latitude);
      this.selectedMarker = this.markers[index];

      this.infoWindows.map(m => m.close());

    }


    markerDragEnd(o: Organisation, $event: MouseEvent) {
      console.log('dragEnd', o, $event);
    }



}

// just an interface for type safety.
interface marker {
	Lat: number;
	Lng: number;
	Name?: string;
	draggable?: boolean;
  isOpen?: boolean;
}
