import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { ProviderType } from './search-categories/provider-type';
import { GeolocationService, GeoLocation, StateType } from '../shared/index';

import { OrganisationService } from '../organisations/organisation.service'
import { AnalyticsService } from '../shared/analytics.service';
import { ProviderTypesService } from './search-categories/index';


@Component({

  selector: 'search-options',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  title = 'Search Options';
  postCode: number;
  keyword: string;
  locationChecked: boolean;
  locationAllowed: boolean = false;
  locationPos: GeoLocation;
  textPlaceholder = "Type...";

  states: StateType[] = [{ code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'NT', name: 'Northern Territory' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'WA', name: 'Western Australia' }];
  private locatingPosition: boolean;

  private subLocation: any;

  @Output() onSearch = new EventEmitter<any>();
  // @ViewChild('locationInput') locInput: ElementRef;

  errorMessage: string;


  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private typesService: ProviderTypesService,
    private geolocationService: GeolocationService,
    public analytics: AnalyticsService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.locationChecked = this.geolocationService.hasUserAgreed;
    if (this.locationChecked) {
      this.locationAllowed = this.geolocationService.locationCapable;

    }

    this.subLocation = this.geolocationService.location$.subscribe(
      (loc) => {
        console.log("search menu position updated: " + new Date());
        this.locationPos = loc;
        this.locatingPosition = false;
        this.textPlaceholder = "Type...";

        if (this.locationPos.valid) {
          this.onLocationIdentified(loc.postcode);
          // this.onCurrentPostcodeSearch(this.locationPos.postcode)
        } else {
          //error

        }

      },
      error => {
        console.log(error);
        this.locatingPosition = false;
        this.textPlaceholder = "Type...";
        // this.textPlaceholder = "Enter a postcode...";
      });

    this.setTitle("Disability Advocacy Finder");


  }


  ngAfterViewInit() {
    // if (this.locInput && this.locInput.nativeElement){
    //   this.locInput.nativeElement.focus();
    // }

    this.analytics.sendPageLoaded('SearchComponent');


  }

  ngOnDestroy() {
    this.subLocation.unsubscribe();
  }

  // onSelectedProviderType (selectedProviderType: ProviderType) {

  //   this.errorMessage = null;

  //   this.organisationService.searchOrgList('byProviderType', selectedProviderType, undefined)
  //       .subscribe(
  //           result => {
  //             console.log('result is ', result);
  //             this.onSearch.emit(selectedProviderType);
  //         },
  //           error => {
  //             this.showErrorMsg(error);
  //           },
  //           () => console.log('complete ProviderType subscription')
  //         );

  // this.resetRefiners();

  // }

  // onSelectedRadius (radius) {

  //   this.errorMessage = null;

  //   this.organisationService.searchOrgList('byRadius', radius, undefined)
  //       .subscribe(
  //           result => {
  //             console.log('result is ', result);
  //             this.onSearch.emit(radius);
  //         },
  //           error => {
  //             this.showErrorMsg(error);
  //           },
  //           () => console.log('complete radius subscription')
  //         );

  // }

  // }

  onSelectedState(state: StateType) {

    this.errorMessage = null;

    this.organisationService.searchOrgList('byState', state, undefined)
      .subscribe(
      result => {
        console.log('result is ', result);
        this.onSearch.emit(state);
      },
      error => {
        this.showErrorMsg(error);
      },
      () => console.log('complete state subscription')
      );
    this.resetRefiners();


  }


  onPostCodeSearch(postCode: any) {
    // console.log('Org std Postcode search for postcode: ' + postCode);
    this.errorMessage = null;
    this.organisationService.searchOrgList('byPostCode', postCode, undefined)
      .subscribe(
      result => {
        // console.log('result is ', result);
        this.onSearch.emit(postCode);
      },
      error => {
        this.showErrorMsg(error);
      },
      () => console.log('complete postcode')
      );

    this.resetRefiners();

  }

  onAllOrganisations() {
    this.errorMessage = null;

    this.organisationService.searchOrgList('all', undefined, undefined)
      .subscribe(
      result => {
        // console.log('result is ', result);
        this.onSearch.emit('all');
      },
      error => {
        this.showErrorMsg(error);
      },
      () => console.log('complete all orgs search subscription')
      );

    this.resetRefiners();


  }

  onKeywordSearch(keywordEntry: string) {
    this.errorMessage = null;

    // this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
    this.organisationService.getByKeyword(keywordEntry)
      .subscribe(
      result => {
        // console.log('result is ', result);
        this.onSearch.emit(keywordEntry);
      },
      error => {
        this.showErrorMsg(error);
      },
      () => console.log('complete keyword search subscription')
      );

    this.resetRefiners();

  }

  onLocationIdentified(postCode: any) {
    console.log('Postcode identified: ' + postCode);
    // if (this.postCode.toString().length == 0){
    this.postCode = postCode;
    // }
  }

  // onLocationTriggered (postCode) {
  //   console.log('Org std Postcode search for postcode: ' + postCode);
  //   // this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  //   this.postCode = postCode;
  //   this.organisationService.searchOrgList('byPostCode', postCode, undefined);

  // }

  enableLocation(allowed: boolean) {
    this.locationChecked = true;
    this.locationAllowed = allowed;
    if (allowed) {
      this.locatingPosition = true;
      this.textPlaceholder = "Locating...";
      this.geolocationService.getLocation(null)
        .subscribe(
        pos => console.log('pos is ', pos),
        error => console.error(error)
        );
      this.analytics.sendEvent('Location', 'Geolocation', 'User Opted In');
    } else {
      this.geolocationService.enableLocation(false);
      this.analytics.sendEvent('Location', 'Geolocation', 'User Opted Out');

    }

  }

  resetRefiners() {
    this.typesService.updateSelectedType(null);
  }

  // get locationCapable(){
  //   return this.locationChecked &&
  //           this.locationPos;
  // }

  private showErrorMsg(error: string) {
    // reset value
    this.errorMessage = '';
    console.error('search error', error);
    this.errorMessage = error;

  }

  get locationError() {
    return this.locationChecked &&
      this.locationPos &&
      !this.locationPos.valid;
  }

  get postcodeValid() {
    return this.postCode != null &&
      this.postCode.toString().length >= 3 &&
      !isNaN(this.postCode);
  }

  get postcodeWarning() {
    return this.postCode != null &&
      ((this.postCode.toString().length > 0 && this.postCode.toString().length < 3) ||
        isNaN(this.postCode));
  }

  get postcodeError() {
    return this.postCode != null &&
      this.postCode.toString().length > 3 &&
      (this.postCode.toString().length < 3 ||
        isNaN(this.postCode));
  }

  // get locationChecked(){
  //   return this.geolocationService.hasRequested;
  //
  // }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


}
