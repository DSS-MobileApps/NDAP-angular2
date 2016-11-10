import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Organisation } from './organisation';
import { OrganisationListComponent, OrganisationDetailComponent, OrganisationService } from './index';
import { ProviderType, SearchComponent, SearchSummaryComponent, RefinerComponent } from '../search/index';

import { AppState } from '../app.service';
import { GeolocationService, AnalyticsService } from '../shared/index';


@Component({

  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css',
    'organisations.component.media.css'],
  // directives: [ SearchComponent, MapComponent, OrganisationListComponent, OrganisationDetailComponent, RefinerComponent, SearchSummaryComponent ],

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
  searchSummary: string;


  private subMarker: any;
  private subSelected: any;
  private subOrgs: any;
  private subSearchVal: any;

  private startTime: any;

  width = 100;
  height = 500;
  // height: number;

  searchMode = true;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  }


  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private _geolocationService: GeolocationService,
    private elementRef: ElementRef,
    public appState: AppState,
    private analytics: AnalyticsService,
    private titleService: Title
  ) {
    this.startTime = new Date();
  }

  // When the component starts,
  ngOnInit() {
    // Subscribe to Org Search Results
    this.subscribeToOrganisations();
    this.subscribeToSelectedOrganisationUpdates();
    this.subscribeToSearchValue();


    this.setTitle("Disability Advocacy Finder");

  }

  ngAfterViewInit() {

    setTimeout((_: any) => this.setMapHeight());
    this.sendFinishedLoadTime();
  }

  private setMapHeight() {
    // let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
    let windowHeight = this.elementRef.nativeElement.ownerDocument.defaultView.innerHeight;
    let headerHeight = this.elementRef.nativeElement.ownerDocument.getElementsByTagName('header')[0].offsetHeight;
    // let footerHeight = this.elementRef.nativeElement.ownerDocument.getElementById('footer').offsetHeight;
    // let tabsHeight = this.elementRef.nativeElement.ownerDocument.getElementById('tabs-list-map-view').offsetHeight;
    let summaryHeight = this.elementRef.nativeElement.ownerDocument.getElementsByClassName('summary')[0].offsetHeight;

    //
    //
    //
    // console.log('current height=' + currentHeight + ' : window=' + windowHeight + ' : header=' + headerHeight  + ' : tabs=' + tabsHeight + ' : footer=' + footerHeight);
    //
    // console.log('window=' + windowHeight + ' : header=' + headerHeight + ' : summary=' + summaryHeight);
    // this.height = windowHeight - headerHeight - summaryHeight;
    // console.log('current main flexbox height=' + this.height);

    let mainHeight = this.elementRef.nativeElement.ownerDocument.getElementsByTagName('main')[0].offsetHeight;
    if (mainHeight >= 0) {
      console.log('current main flexbox height=' + mainHeight);
      this.height = mainHeight;
    }



  }

  ngOnDestroy() {
    if (this.subMarker) { this.subMarker.unsubscribe(); }
    if (this.subSelected) { this.subSelected.unsubscribe(); }
    if (this.subOrgs) { this.subOrgs.unsubscribe(); }
    if (this.subSearchVal) { this.subSearchVal.unsubscribe(); }
  }

  onResize(event: any) {
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
    // this.mapService.selectMarker(selectedOrg.Id.toString());
    // this.selectedOrganisation = selectedOrg;
    this.organisationService.updateSelectedOrganisation(selectedOrg);

  };

  // Be notified when a organisation is selected
  private subscribeToSelectedOrganisationUpdates() {
    // this.subMarker = this.mapService.markerSelected$
    //   .subscribe(
    //     selectedOrgId => this.updateSelected(+selectedOrgId),
    //     error =>  console.log(error));
    this.subSelected = this.organisationService.selectedOrganisation
      .subscribe(
      selectedOrganisation => this.selectedOrganisation = selectedOrganisation,
      error => console.log(error));

  }

  private subscribeToOrganisations() {
    // this.subOrgs = this.organisationService.orgListSource$
    this.subOrgs = this.organisationService.organisations
      .subscribe(
      organisations => this.updateOrganisations(organisations),
      // organisations => this.organisations = organisations,
      error => this.errorMessage = <any>error);
  }


  private subscribeToSearchValue() {
    // console.info('searchResults, subscribing to SearchVal');
    // this.subOrgs = this.organisationService.orgListSource$
    this.subSearchVal = this.organisationService.searchValue
      .subscribe(
      val => {
        // console.info('got search val from OrganisationService', val);
        this.searchSummary = val;
      },
      error => {
        console.error('Search results error:', error);
        this.errorMessage = <any>error;
        this.searchSummary = '';
      });


  }


  private updateSelected(id: number) {
    this.selectedOrgId = id;
  }

  private updateOrganisations(organisations: Organisation[]) {
    this.organisations = organisations;
    this.searchMode = false;


  }

  toggleSearchMode() {
    console.log('toggle search mode');
    this.searchMode = !this.searchMode;
  }

  get hasOrganisations() {
    if (!this.organisations) {
      return false;
    }

    return this.organisations.length > 0;
  }

  get hasResults() {
    if (!this.organisations) {
      return false;
    }

    return this.organisations.length > 0;
  }

  refreshPosition() {
    this._geolocationService.getLocation(this.opts);
  }

  onUnselect(selectedOrg: any) {
    this.organisationService.updateSelectedOrganisation(null);
    // this.router.navigate(['/organisations']);
    // this.goBack();
  }




  // onUnselect(selectedOrg: Organisation) {
  // this.organisationService.updateSelectedOrganisation(null);
  // console.group('Unselect Org:');
  // console.log(selectedOrg);
  // if (selectedOrg){
  //   this.router.navigate(['/organisations', {o: selectedOrg.Id}]);
  // }else{
  //   this.router.navigate(['/organisations']);
  // }
  // console.groupEnd();
  // // this.goBack();
  // }

  sendFinishedLoadTime() {
    var endTime = new Date();
    var milliseconds = (endTime.getTime() - this.startTime.getTime());
    // console.info('SearchResultsComponent loaded:', milliseconds);
    this.analytics.sendComponentLoaded('SearchResultsComponent', milliseconds);
  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


}
