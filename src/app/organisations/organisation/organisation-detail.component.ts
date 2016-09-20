import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../../map/map.service';
import {GeolocationService, GeoLocation} from '../../shared/index';

import { Organisation } from '../organisation';
import { OrganisationService } from '../organisation.service';
// import { EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink } from '../../shared/index';

@Component({

  selector: 'organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html',
  // pipes: [EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink],
  host: {'class' : 'ng-animate orgDetailContainer'}
})

export class OrganisationDetailComponent implements OnInit, AfterViewInit  {
  @ViewChild('mapdetail') mapElement: ElementRef;
  @Input() organisation: Organisation;
  @Output() onUnselected = new EventEmitter<any>();


  private sub: any;
  private subLocation: any;
  private subOrgId: any;
  locationPos: GeoLocation;
  googleMapsDirections: string;

  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private mapService: MapService,
    private geolocationService: GeolocationService
  ) {
  }


  ngOnInit() {

    // if (this.organisation){
    //   console.log(this.organisation);
    // }else{
    //   console.log('org detail input org is empty');
    // }

    this._initMapInstance(this.mapElement.nativeElement);

  }


  ngAfterViewInit() {
    // this.initMap();
        this.sub = this.organisationService.selectedOrganisation$
          .subscribe(
            selectedOrganisation => this.getOrganisation(selectedOrganisation),
            error =>  console.log(error));
        //
        // this.subLocation = this.geolocationService.location$.subscribe(
        //           (loc) => {
        //             this.locationPos = loc;
        //             this.googleMapsDirections = this.getDirectionsUrl();
        //         },
        //       error => {
        //         console.log(error);
        //       });

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

      this.mapService.createDetailMap(el);
  }

  ngOnDestroy() {
    if (this.sub) {this.sub.unsubscribe();}
    if (this.subLocation) {this.subLocation.unsubscribe();}
  }

  ngOnChanges(changes) {

  		// console.log('Change detected:', changes);
      if (changes.organisation){
        console.log('Organisation Change detected:', changes.organisation);
        if (this.organisation){
          this.initMap();
        }
      }
  	}

  initMap() {
    console.debug('org detail - init map');
    if (this.mapElement != null && this.organisation != null)
    {
      // this.mapService.createDetailMap(this.mapElement.nativeElement, this.organisation)
      this.mapService.addDetailMarker(this.organisation);
    }
  }


    getOrganisation(organisation: Organisation){

      this.organisation = organisation;
      console.log('get organisation');
      console.log(this.organisation);

      if (this.organisation){
        this.getOrganisationById(organisation.Id);
        this.googleMapsDirections = this.getDirectionsUrl();
      }

    }

    getOrganisationById(id){
      console.log('get organisation by id: ' + id);
      this.subOrgId = this.organisationService.getOrganisation(id)
      .subscribe((organisation) => {
        this.organisation = organisation;
        this.initMap();
        this.subOrgId.unsubscribe();
      });
    }




  // goBack() {
  //   // this.router.navigate(['/']);
  //   window.history.back();
  // }
  deselect() {
    this.onUnselected.emit(this.organisation);
    this.organisationService.updateSelectedOrganisation(null);
    // this.router.navigate(['/']);
    // this.goBack();
  }

  get fundingSourceFormatted(){
    if (this.organisation.FundingSource == "Commonwealth"){
      return "Commonwealth funded";
    }
    else if (this.organisation.FundingSource == "State"){
      return "State funded";
    }
    return "";

  }

  get googleMapsLink(){
    if (this.organisation != null){
      // console.info('maps link url update');

      return "https://www.google.com/maps/place/"
            + this.organisation.Lat + "," + this.organisation.Lng
            + "/@"
            + this.organisation.Lat
            + ","
            + this.organisation.Lng
            + ",18z/";
    }else{
      return "#";
    }
  }

 getDirectionsUrl(){
    if (this.organisation != null){
      let url = "https://www.google.com/maps/dir/";
      if (this.locationPos) {
        url = url +  this.locationPos.latitude + "," + this.locationPos.longitude;
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

    }else{
      return "#";
    }
  }

}
