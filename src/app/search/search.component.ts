import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// import { ProviderTypesComponent } from './search-categories/provider-types.component';
// import { SearchLocationComponent } from './search-location/search-location.component';
// import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
// import { SearchStateComponent } from './search-state/search-state.component';

import { ProviderType } from './search-categories/provider-type';
import {GeolocationService, GeoLocation} from '../shared/index';

// import { StateType } from './../shared/state-type';

// import {ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent, ProviderType} from './index';

import { OrganisationService } from '../organisations/organisation.service'

@Component({

  selector: 'search-options',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  // directives: [ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent]
})

export class SearchComponent implements OnInit, AfterViewInit {
  title = 'Search Options';
  postCode: number;
  keyword: string;
  locationChecked: boolean;
  locationAllowed: boolean = false;
  locationPos: GeoLocation;
  textPlaceholder = "Type...";
  private locatingPosition: boolean;

  private subLocation: any;

  @Output() onSearch = new EventEmitter<any>();
  @ViewChild('locationInput') locInput: ElementRef;


  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(){
    this.locationChecked = this.geolocationService.hasUserAgreed;
    if (this.locationChecked){
      this.locationAllowed = this.geolocationService.locationCapable;

    }

    this.subLocation = this.geolocationService.location$.subscribe(
          (loc) => {
            console.log("search menu position updated: " + new Date());
            this.locationPos = loc;
            this.locatingPosition = false;
            this.textPlaceholder = "Type...";

            if (this.locationPos.valid){
              this.onLocationIdentified(loc.postcode);
              // this.onCurrentPostcodeSearch(this.locationPos.postcode)
            }else{
              //error

            }

        },
      error => {
        console.log(error);
        this.locatingPosition = false;
        this.textPlaceholder = "Type...";
        // this.textPlaceholder = "Enter a postcode...";
      });

  }

  
   ngAfterViewInit() {            
      if (this.locInput && this.locInput.nativeElement){
        this.locInput.nativeElement.focus();
      }
    }

  ngOnDestroy(){
    this.subLocation.unsubscribe();
  }

  onSelectedProviderType (selectedProviderType: ProviderType) {
    this.organisationService.searchOrgList('byProviderType', selectedProviderType, undefined);
    this.onSearch.emit(selectedProviderType);

  }

  onSelectedRadius (radius) {
    this.organisationService.searchOrgList('byRadius', radius, undefined);
    this.onSearch.emit(radius);

  }

  // onSelectedState (state: StateType) {
  //   this.organisationService.searchOrgList('byState', state, undefined);
  // }


  onPostCodeSearch (postCode) {
    console.log('Org std Postcode search for postcode: ' + postCode);
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
    this.onSearch.emit(postCode);

  }

  onAllOrganisations() {
    this.organisationService.searchOrgList('all', undefined, undefined);
    this.onSearch.emit('all');

  }

  onKeywordSearch (keywordEntry) {
    // this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
    this.organisationService.getByKeyword(keywordEntry);
    this.onSearch.emit(keywordEntry);
  }

  onLocationIdentified (postCode) {
    console.log('Postcode identified: ' + postCode);
    // if (this.postCode.toString().length == 0){
      this.postCode = postCode;
    // }
  }

  onLocationTriggered (postCode) {
    console.log('Org std Postcode search for postcode: ' + postCode);
    // this.organisationService.searchOrgList('byPostCode', postCode, undefined);
    this.postCode = postCode;
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  enableLocation(allowed){
    this.locationChecked = true;
    if (allowed){
      this.locatingPosition = true;
      this.textPlaceholder = "Locating...";
      this.geolocationService.getLocation(null);
    }else{
      this.geolocationService.enableLocation(false);
    }

  }

  // get locationCapable(){
  //   return this.locationChecked &&
  //           this.locationPos;
  // }

  get locationError(){
    return this.locationChecked &&
            this.locationPos &&
            !this.locationPos.valid;
  }

  get postcodeValid(){
    return this.postCode != null &&
            this.postCode.toString().length >= 3 &&
            !isNaN(this.postCode);
  }

  get postcodeWarning(){
    return this.postCode != null &&
          ((this.postCode.toString().length > 0 && this.postCode.toString().length < 3) ||
            isNaN(this.postCode));
  }

  get postcodeError(){
    return this.postCode != null &&
          this.postCode.toString().length > 3 &&
            (this.postCode.toString().length < 3 ||
            isNaN(this.postCode));
  }

  // get locationChecked(){
  //   return this.geolocationService.hasRequested;
  //
  // }



}
