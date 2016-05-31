import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderType } from '../categories/provider-type';
import { ProviderTypesComponent } from '../categories/provider-types.component';

import { OrganisationService } from '../organisations/organisation.service'

@Component({
  moduleId: module.id,
  selector: 'search-options',
  templateUrl: 'search.component.html',
  directives: [ProviderTypesComponent]
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

  onPostCodeSearch (postCode) {
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  onAllOrganisations() {
  this.organisationService.searchOrgList('all', undefined, undefined);

  }

}
