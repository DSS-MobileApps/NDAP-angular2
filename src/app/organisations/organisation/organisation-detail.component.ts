import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../../map/map.service';
import { GeolocationService, GeoLocation, AnalyticsService } from '../../shared/index';

import { Organisation } from '../organisation';
import { OrganisationService } from '../organisation.service';
// import { EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink } from '../../shared/index';

@Component({

  selector: 'organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html',
  // pipes: [EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink],
  host: { 'class': 'ng-animate orgDetailContainer' }
})

export class OrganisationDetailComponent implements OnInit, AfterViewInit, OnChanges {
  // @ViewChild('mapdetail') mapElement: ElementRef;
  @Input() organisation: Organisation = null;
  @Output() onUnselected = new EventEmitter<any>();


  private sub: any;
  private subLocation: any;
  private subOrgId: any;
  locationPos: GeoLocation;
  googleMapsLink: string;
  googleMapsDirections: string;

  private startTime: any;

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    // private organisationService: OrganisationService,
    private geolocationService: GeolocationService,
    private analytics: AnalyticsService
  ) {
    this.startTime = new Date();
  }


  ngOnInit() {

    // this.sub = this.organisationService.selectedOrganisation$
    //   .subscribe(
    //     selectedOrganisation => this.getOrganisation(selectedOrganisation),
    //     error =>  console.log(error));

    // if (this.organisation){
    //   console.log(this.organisation);
    // }else{
    //   console.log('org detail input org is empty');
    // }

    // this._initMapInstance(this.mapElement.nativeElement);
    this.subLocation = this.geolocationService.location$
      .subscribe(
      (loc) => {
        console.info('got location', loc);
        this.locationPos = loc;
        this.googleMapsDirections = this.generateDirectionsUrl();
      },
      error => {
        console.log(error);
      });

  }


  ngAfterViewInit() {

    this.sendFinishedLoadTime();
    // this.initMap();


    this.geolocationService.getLocation(null)
      .subscribe(
      (loc) => {
        console.info('start location', loc);
      },
      error => {
        console.log(error);
      });

    // this.sub = this.route
    //   .params
    //   .subscribe(params => {
    //     let id = +params['id'];
    //     if (id > 0){
    //       console.log('id is ' + id);
    //       // Set organisation to the one returned
    //       this.getOrganisationById(id);
    //     }
    //   });
    //
    // this.organisationService.selectedOrganisation$
    //   .subscribe(
    //     selectedOrganisation => this.getOrganisation(selectedOrganisation),
    //     error =>  console.log(error));



  }

  private _initMapInstance(el: any) {
    console.log('init detail map');

    // this.mapService.createDetailMap(el);
  }

  ngOnDestroy() {
    // if (this.sub) {this.sub.unsubscribe();}
    // if (this.subLocation) {this.subLocation.unsubscribe();}
  }

  ngOnChanges(changes: any) {

    // console.log('Change detected:', changes);
    if (changes.organisation) {
      console.log('Organisation Change detected:', changes.organisation);
      if (this.organisation) {
        this.googleMapsLink = this.generateGoogleMapsLink();
        this.googleMapsDirections = this.generateDirectionsUrl();
      }
    }
  }

  // initMap() {
  //   console.debug('org detail - init map');
  //   // if (this.mapElement != null && this.organisation != null)
  //   // {
  //   //   // this.mapService.createDetailMap(this.mapElement.nativeElement, this.organisation)
  //   //   this.mapService.addDetailMarker(this.organisation);
  //   // }
  // }

  sendFinishedLoadTime() {
    var endTime = new Date();
    var milliseconds = (endTime.getTime() - this.startTime.getTime());
    console.info('OrganisationDetailComponent loaded:', milliseconds);
    this.analytics.sendComponentLoaded('OrganisationDetailComponent', milliseconds);
  }


  // getOrganisation(organisation: Organisation){

  //   this.organisation = organisation;
  //   console.log('get organisation');
  //   console.log(this.organisation);


  //   if (this.organisation){
  //     console.log('set page title to', this.organisation.Name);
  //     this.setTitle(this.organisation.Name + " - Disability Advocacy Finder");
  //     this.getOrganisationById(organisation.Id);
  //     this.googleMapsDirections = this.getDirectionsUrl();
  //   }

  // }

  // getOrganisationById(id){
  //   console.log('get organisation by id: ' + id);
  //   this.subOrgId = this.organisationService.getOrganisation(id)
  //   .subscribe((organisation) => {
  //     this.organisation = organisation;
  //     this.initMap();
  //     this.subOrgId.unsubscribe();
  //   });
  // }




  // goBack() {
  //   // this.router.navigate(['/']);
  //   window.history.back();
  // }
  deselect() {
    this.onUnselected.emit(this.organisation);
    // this.organisationService.updateSelectedOrganisation(null);
    // this.router.navigate(['/']);
    // this.goBack();
  }

  get fundingSourceFormatted() {
    if (this.organisation.FundingSource == "Commonwealth") {
      return "Commonwealth funded";
    }
    else if (this.organisation.FundingSource == "State") {
      return "State funded";
    }
    return "";

  }

  generateGoogleMapsLink() {
    if (this.organisation != null) {
      let url = "https://www.google.com/maps/place/"
        + this.organisation.Lat + "," + this.organisation.Lng
        + "/@"
        + this.organisation.Lat
        + ","
        + this.organisation.Lng
        + ",18z/";

      console.info('maps url is ' + url);
      return url;
    } else {
      return "#";
    }
  }

  generateDirectionsUrl() {
    if (this.organisation != null) {
      let url = "https://www.google.com/maps/dir/";
      if (this.locationPos) {
        url = url + this.locationPos.latitude + "," + this.locationPos.longitude;
      }
      url = url + "/" + this.organisation.Lat + "," + this.organisation.Lng
        + "/@"
        + this.organisation.Lat
        + ","
        + this.organisation.Lng
        + "/";
      console.info('directions url is ' + url);
      return url;
      // window.location.href= url;

    } else {
      return "#";
    }
  }


  linkAction(action: string, triggerName?: string) {
    console.log(triggerName + ' triggered going to ', action);
    this.analytics.sendUIEvent(action, triggerName);
  }



}
