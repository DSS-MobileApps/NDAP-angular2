import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderType } from '../search/search-categories/provider-type';

import { Organisation } from './organisation';
import { OrganisationListComponent } from './organisation-list.component';
import { OrganisationService } from './organisation.service';
// import { OrganisationSummaryComponent } from './organisation-summary.component';
import { GeolocationService } from '../shared/geolocation.service';
import { SearchComponent } from '../search/search.component';
import { RefinerComponent } from '../search/refiner.component';
import { MapComponent, MapService } from '../map/index';

import {RemoveSpaces} from '../shared/';

import { OrganisationDetailComponent } from './organisation-detail.component';


@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css',
            'organisations.component.media.css'],
  directives: [ SearchComponent, MapComponent, OrganisationListComponent, OrganisationDetailComponent, RefinerComponent ],

  /**
   * Define two states, "inactive" and "active", and the end
   * styles that apply whenever the element is in those states.
   * Then define animations for transitioning between the states,
   * one in each direction
   */
  // animations: [
  //   trigger('selectedState', [
  //     state('false', style({
  //       // backgroundColor: '#eee',
  //       // transform: 'translate(-100%, 0)'
  //     })),
  //     state('true',   style({
  //       // backgroundColor: '#cfd8dc',
  //       // transform: 'translate(100%, 0)'
  //       // transform: 'translate(-33.3%, 0)'
  //     })),
  //     transition('false <=> true', animate('100ms ease-out')),
  //     // transition('active => inactive', animate('100ms ease-out'))
  //   ])
  // ]

})

export class OrganisationsComponent implements OnInit, AfterViewInit {
  title = 'List of Organisations';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  selectedOrgId: number;
  errorMessage: string;
  userPos: any;

  width = 100;
  height = 100;
  // height: number;

  searchMode=true;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  }


  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private _geolocationService: GeolocationService,
    private mapService: MapService,
    private elementRef: ElementRef
  ) {
  }

  // When the component starts,
  ngOnInit () {
    // Subscribe to Org Search Results
    this.subscribeToOrganisations();
    this.subscribeToSelectedOrganisationUpdates();

    // Perform a default search for all orgs
    this.organisationService.searchOrgList('all', undefined, undefined);

    // Subscribe to Selected Org events



  }

  ngAfterViewInit() {

    setTimeout(_=> this.setMapHeight());
    }

    private setMapHeight(){
      let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
      let windowHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
      let headerHeight = this.elementRef.nativeElement.ownerDocument.getElementsByTagName('header')[0].offsetHeight;
      let footerHeight = this.elementRef.nativeElement.ownerDocument.getElementById('footer').offsetHeight;
      let tabsHeight = this.elementRef.nativeElement.ownerDocument.getElementById('tabs-list-map-view').offsetHeight;



      console.log('current height=' + currentHeight + ' : window=' + windowHeight + ' : header=' + headerHeight  + ' : tabs=' + tabsHeight + ' : footer=' + footerHeight);

      // this.elementRef.nativeElement.getElementsByTagName('div')[0].style.height = windowHeight - headerHeight - footerHeight;
      // this.height = windowHeight - headerHeight - tabsHeight - footerHeight;
      this.height = windowHeight - headerHeight - footerHeight;
     //collapsable only if the contents make container exceed the max height
      // if (currentHeight > this.maxHeight) {
      //     this.isCollapsed = true;
      //     this.isCollapsable = true;
      // }

    }

  onResize(event) {
      // // this.width += 100;
      // // this.height += 100;
      // let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
      //
      // console.log("window resized to width:" + this.width + " - height: " + this.height);
      this.setMapHeight();

    }

  // When an Org is selected from the list, navigate to that record in a detail view
  onSelectDetailsButton(selectedOrg: Organisation) {
    this.organisationService.updateSelectedOrganisation(selectedOrg);
    this.mapService.selectMarker(selectedOrg.Id.toString());
    this.router.navigate(['/organisation', selectedOrg.Id]);
    // this.selectedOrganisation = organisation;
  }

    // When a marker is clicked, tell the Org Service
  onSelect(selectedOrg: Organisation) {
    this.mapService.selectMarker(selectedOrg.Id.toString());
    // this.selectedOrganisation = selectedOrg;
    this.organisationService.updateSelectedOrganisation(selectedOrg);

  };

  // Be notified when a organisation is selected
  private subscribeToSelectedOrganisationUpdates() {
    this.mapService.markerSelected$
      .subscribe(
        selectedOrgId => this.updateSelected(+selectedOrgId),
        error =>  console.log(error));
    this.organisationService.selectedOrganisation$
      .subscribe(
        selectedOrganisation => this.selectedOrganisation = selectedOrganisation,
        error =>  console.log(error));

  }

  private subscribeToOrganisations() {
    this.organisationService.orgListSource$
      .subscribe(
        organisations => this.updateOrganisations(organisations),
        // organisations => this.organisations = organisations,
        error =>  this.errorMessage = <any>error);
  }

  private updateSelected(id: number) {
    this.selectedOrgId = id;
  }

  private updateOrganisations(organisations: Organisation[]) {
    this.organisations = organisations;
    this.searchMode = false;


  }

  toggleSearchMode(){
    console.log('toggle search mode');
      this.searchMode = !this.searchMode;
  }

  get hasOrganisations(){
    if (!this.organisations) {
      return false
    }
    return this.organisations.length > 0;
  }

  refreshPosition(){
    this._geolocationService.getLocation(this.opts);
  }
}
