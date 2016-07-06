import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/provider-types.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
import { SearchStateComponent } from './search-state/search-state.component';

// import { ProviderType } from './search-categories/provider-type';
// import { StateType } from './../shared/state-type';

import { OrganisationService } from '../organisations/organisation.service'

@Component({
  moduleId: module.id,
  selector: 'refiner-options',
  templateUrl: 'refiner.component.html',
  directives: [ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent],
  styleUrls: ['refiner.component.css']

})

export class RefinerComponent {
  title = 'Refiner Options';
  postCode: number;

  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) {}

  // onSelectedProviderType (selectedProviderType: ProviderType) {
  //   this.organisationService.searchOrgList('byProviderType', selectedProviderType, undefined);
  // }

  // onSelectedRadius (radius) {
  //   this.organisationService.searchOrgList('byRadius', radius, undefined);
  // }

  onSelectedState (state) {
    this.organisationService.searchOrgList('byState', state, undefined);
  }


  onPostCodeSearch (postCode) {
    console.log('Org std Postcode search for postcode: ' + postCode);
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  onAllOrganisations() {
    this.organisationService.searchOrgList('all', undefined, undefined);

  }

  // onKeywordSearch (keywordEntry) {
  //   this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
  // }



}
