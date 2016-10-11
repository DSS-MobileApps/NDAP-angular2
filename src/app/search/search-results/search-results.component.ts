import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { Observable }     from 'rxjs/Observable';

import { AppState } from '../../app.service';

// import { ProviderType } from '../search/search-categories/provider-type';

import { Organisation } from '../../organisations/organisation';
import { OrganisationService } from '../../organisations/index';

// import { OrganisationListComponent } from '../../organisations/index';

import { GeolocationService, AnalyticsService } from '../../shared/index';
import { ProviderType } from '../search-categories/index';
// import { SearchComponent } from '../search.component';
// import { SearchSummaryComponent } from '../search-summary/index';

// import { RefinerComponent } from '../refiner.component';

// import {  MapService } from '../../map/index';

// import {RemoveSpaces} from '../../shared/';

// import { OrganisationDetailComponent } from './organisation-detail.component';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';


@Component({

  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css',
            'search-results.component.media.css'],
  // directives: [ MapComponent, OrganisationListComponent, RefinerComponent, SearchSummaryComponent ],

  /* The element here always has the state "in" when it
   * is present. We animate two transitions: From void
   * to in and from in to void, to achieve an animated
   * enter and leave transition. The element enters from
   * the left and leaves to the right using translateX.
   */
  animations: [
    trigger('enterLeave', [
      state('in', style({transform: 'translateY(0)'})),
      // transition('void => *', [
      //   style({transform: 'translateY(100%)'}),
      //   animate(200)
      // ]),
      // transition('* => void', [
      //   animate(200, style({transform: 'translateY(-100%)'}))
      // ])
    ])
  ]

})

export class SearchResultsComponent implements OnInit, AfterViewInit {
  title = 'Organisation search results';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  selectedOrgId: number;
  errorMessage: string;
  userPos: any;

  private subMarker: any;
  private subSelected: any;
  private subOrgs: any;

  private startTime;


  width = 100;
  height = 500;
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
    // private _geolocationService: GeolocationService,
    private elementRef: ElementRef,
    private _wrapper: GoogleMapsAPIWrapper,
    public appState: AppState,
    private analytics: AnalyticsService,
    private titleService: Title
  ) {
      this.startTime = new Date();
  }

  // When the component starts,
  ngOnInit () {
    // console.info('INIT SearchResultsComponent: state is ', this.appState.get().searchType);


    if (this.appState.get().searchType == null){
      console.info('No search state detected, redirect to search page');
      this.router.navigateByUrl("/search");
    }else{
// setTimeout(_=> this.setMapHeight());
    this.setMapHeight();

    // Subscribe to Org Search Results
    this.subscribeToOrganisations();
    this.subscribeToSelectedOrganisationUpdates();

    // Perform a default search for all orgs
    // this.organisationService.searchOrgList('all', undefined, undefined);

    // this.organisationService.getCachedList();

    // Subscribe to Selected Org events

    }

    
      this.setTitle("Disability Advocacy Finder");


  }

  ngAfterViewInit() {
    this.sendFinishedLoadTime();
  }


  public setTitle( newTitle: string) {
      this.titleService.setTitle( newTitle );
  }

    private setMapHeight(){
      // let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
      // let windowHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
      // let headerHeight = this.elementRef.nativeElement.ownerDocument.getElementsByTagName('header')[0].offsetHeight;
      // let footerHeight = this.elementRef.nativeElement.ownerDocument.getElementById('footer').offsetHeight;
      // let tabsHeight = this.elementRef.nativeElement.ownerDocument.getElementById('tabs-list-map-view').offsetHeight;
      //
      //
      //
      // console.log('current height=' + currentHeight + ' : window=' + windowHeight + ' : header=' + headerHeight  + ' : tabs=' + tabsHeight + ' : footer=' + footerHeight);
      //
      // this.height = windowHeight - headerHeight - footerHeight;


       let mainHeight = this.elementRef.nativeElement.ownerDocument.getElementsByTagName('main')[0].offsetHeight;
      if (mainHeight >= 0){
        console.log('current main flexbox height=' + mainHeight);
        this.height = mainHeight;
      }



    }

    ngOnDestroy() {
    if (this.subMarker) {this.subMarker.unsubscribe();}
    if (this.subSelected) {this.subSelected.unsubscribe();}
    if (this.subOrgs) {this.subOrgs.unsubscribe();}
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
    // this.mapService.selectMarker(selectedOrg.Id.toString());
    this.router.navigate(['/organisation', selectedOrg.Id]);
    // this.selectedOrganisation = organisation;
  }

    // When a marker is clicked, tell the Org Service
  onSelect(selectedOrg: Organisation) {
    console.log('selected ', selectedOrg);
    // this.mapService.selectMarker(selectedOrg.Id.toString());
    // this.selectedOrganisation = selectedOrg;
    this.organisationService.updateSelectedOrganisation(selectedOrg);
    this.router.navigate(['/organisation', selectedOrg.Id]);

  };

  // Be notified when a organisation is selected
  private subscribeToSelectedOrganisationUpdates() {
    // this.subMarker = this.mapService.markerSelected$
    //   .subscribe(
    //     selectedOrgId => this.updateSelected(+selectedOrgId),
    //     error =>  console.log(error));
    this.subSelected = this.organisationService.selectedOrganisation$
      .subscribe(
        selectedOrganisation => this.selectedOrganisation = selectedOrganisation,
        error =>  console.log(error));

  }

  private subscribeToOrganisations() {
    console.info('searchResults, subscribing to Orgs');
    // this.subOrgs = this.organisationService.orgListSource$
    this.subOrgs = this.organisationService.organisations
      .subscribe(
        organisations => {
          console.info('got orgs from orgListSource', organisations);
          this.updateOrganisations(organisations)
        },
        error =>  {
          console.error('Search results error:', error);
          this.errorMessage = <any>error;
        },
        () => {
          console.log('org subscribe complete');
        });
        
  }

  private updateSelected(id: number) {
    this.selectedOrgId = id;
  }

  private updateOrganisations(organisations: Organisation[]) {
    this.organisations = organisations;
    this.searchMode = false;
    this.errorMessage = null;

    console.info('orgs updated: ', organisations);

  }

  goToSearch(){
    // console.log('back to search mode');
      // this.searchMode = !this.searchMode;
      this.router.navigateByUrl('/search');
      this.analytics.sendUIEvent('Search again', 'From search icon button');

  }

  sendFinishedLoadTime(){
      var endTime = new Date();
      var milliseconds = (endTime.getTime() - this.startTime.getTime());
      console.info('SearchResultsComponent loaded:', milliseconds);
      this.analytics.sendComponentLoaded('SearchResultsComponent', milliseconds);
  }


  get hasOrganisations(){
    if (this.organisations && this.organisations.length > 0) {
      return true;
    }

    return false;
  }

  get hasResults(){
    if (!this.organisations) {
      return false;
    }

    return this.organisations.length > 0;
  }



  // refreshPosition(){
  //   this._geolocationService.getLocation(this.opts);
  // }
}
