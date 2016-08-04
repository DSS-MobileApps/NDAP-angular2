import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/provider-types.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
import { SearchStateComponent } from './search-state/search-state.component';

import { ProviderType } from './search-categories/provider-type';
import {GeolocationService, GeoLocation} from '../shared/index';

// import { StateType } from './../shared/state-type';

// import {ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent, ProviderType} from './index';

import { OrganisationService } from '../organisations/organisation.service'

@Component({
  moduleId: module.id,
  selector: 'search-options',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent]
})

export class SearchComponent implements OnInit {
  title = 'Search Options';
  postCode: number;
  keyword: string;
  locationChecked: boolean;
  locationPos: GeoLocation;
  textPlaceholder = "Enter a Postcode...";
  private locatingPosition: boolean;

  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(){
    this.locationChecked = this.geolocationService.hasUserEnabled;
    if (this.locationChecked){
      this.enableLocation(true);
    }

    this.geolocationService.location$.subscribe(
          (loc) => {
            console.log("search menu position updated: " + new Date());
            this.locationPos = loc;
            this.locatingPosition = false;
            this.textPlaceholder = "Enter a postcode...";

            this.onLocationIdentified(loc.postcode);
            // this.onCurrentPostcodeSearch(this.locationPos.postcode)
        },
      error => {
        console.log(error);
        this.locatingPosition = false;
        this.textPlaceholder = "Enter a postcode...";
      });

  }

  onSelectedProviderType (selectedProviderType: ProviderType) {
    this.organisationService.searchOrgList('byProviderType', selectedProviderType, undefined);
  }

  onSelectedRadius (radius) {
    this.organisationService.searchOrgList('byRadius', radius, undefined);
  }

  // onSelectedState (state: StateType) {
  //   this.organisationService.searchOrgList('byState', state, undefined);
  // }


  onPostCodeSearch (postCode) {
    console.log('Org std Postcode search for postcode: ' + postCode);
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  onAllOrganisations() {
    this.organisationService.searchOrgList('all', undefined, undefined);

  }

  onKeywordSearch (keywordEntry) {
    this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
  }

  onLocationIdentified (postCode) {
    console.log('Org std Postcode for postcode: ' + postCode);
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
      this.textPlaceholder = "Locating postcode...";
      this.geolocationService.getLocation(null);
    }else{
      this.geolocationService.enableLocation(false);
    }

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
