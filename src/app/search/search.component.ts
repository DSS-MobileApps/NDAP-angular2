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
  locationAllowed: boolean = false;
  locationPos: GeoLocation;
  textPlaceholder = "Enter a Postcode...";
  private locatingPosition: boolean;

  private subLocation: any;

  @Output() onSearch = new EventEmitter<any>();


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
            this.textPlaceholder = "Enter a postcode...";

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
        this.textPlaceholder = "Enter a postcode...";
      });

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
      this.textPlaceholder = "Locating postcode...";
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
