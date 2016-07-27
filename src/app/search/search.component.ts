import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/provider-types.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
import { SearchStateComponent } from './search-state/search-state.component';

import { ProviderType } from './search-categories/provider-type';
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

export class SearchComponent {
  title = 'Search Options';
  postCode: number;
  keyword: string;

  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) {}

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
    console.log('Org std Postcode search for postcode: ' + postCode);
    // this.organisationService.searchOrgList('byPostCode', postCode, undefined);
    this.postCode = postCode;
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
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


}
