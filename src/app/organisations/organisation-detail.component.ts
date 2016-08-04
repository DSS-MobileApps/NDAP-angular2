import { Component, ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../map/map.service';
import {GeolocationService, GeoLocation} from '../shared/index';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';
import { EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html',
  pipes: [EmailLink, PhoneLink, CommaSplitList, CommaSplitArray, WebLink],
  host: {'class' : 'ng-animate orgDetailContainer'}
})

export class OrganisationDetailComponent implements AfterViewInit  {
  @ViewChild('mapdetail') mapElement: ElementRef;
  @Input() organisation: Organisation;
  private sub: any;
  locationPos: GeoLocation;
  googleMapsDirections: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private mapService: MapService,
    private geolocationService: GeolocationService
  ) {
  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.initMap();
    this.sub = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        if (id > 0){
          console.log('id is ' + id);
          // Set organisation to the one returned
          this.getOrganisationById(id);
        }
      });

    this.organisationService.selectedOrganisation$
      .subscribe(
        selectedOrganisation => this.getOrganisation(selectedOrganisation),
        error =>  console.log(error));

        this.geolocationService.location$.subscribe(
              (loc) => {
                this.locationPos = loc;
                this.googleMapsDirections = this.getDirectionsUrl();
            },
          error => {
            console.log(error);
          });

  }

  initMap() {
    if (this.mapElement != null && this.organisation != null)
    {
      this.mapService.createDetailMap(this.mapElement.nativeElement, this.organisation)
    }
  }


    getOrganisation(organisation: Organisation){
      this.organisation = organisation;
      if (this.organisation){
        this.getOrganisationById(organisation.Id);
        this.googleMapsDirections = this.getDirectionsUrl();
      }

    }

    getOrganisationById(id){
      this.organisationService.getOrganisation(id)
      .subscribe((organisation) => {
        this.organisation = organisation;
        this.initMap();
      });
    }




  goBack() {
    // this.router.navigate(['/']);
    window.history.back();
  }
  deselect() {
    this.organisationService.updateSelectedOrganisation(null);
    this.router.navigate(['/']);
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
