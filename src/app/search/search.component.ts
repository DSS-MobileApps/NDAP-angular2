import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/provider-types.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
import { SearchStateComponent } from './search-state/search-state.component';

import { ProviderType } from './search-categories/provider-type';
import { StateType } from './../shared/state-type';

import { OrganisationService } from '../organisations/organisation.service'

@Component({
  moduleId: module.id,
  selector: 'search-options',
  templateUrl: 'search.component.html',
  directives: [ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent]
  // templateUrl: 'provider-types.component.html',
  // styleUrls: ['provider-types.component.css']
})

export class SearchComponent {
  postCode: number;

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

  onSelectedState (state: StateType) {
    this.organisationService.searchOrgList('byState', state, undefined);
  }

  onPostCodeSearch (postCode) {
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  onAllOrganisations() {
    this.organisationService.searchOrgList('all', undefined, undefined);

  }

  onKeywordSearch (keywordEntry) {
    this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
  }



}
