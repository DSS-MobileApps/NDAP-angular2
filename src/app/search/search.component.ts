import { Component, Output, EventEmitter } from '@angular/core';
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
  title = 'Search Options';
  postCode: number;

  @Output() onChangedSearch = new EventEmitter<any[]>();

  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) {}

  onSelectedProviderType (selectedProviderType: ProviderType) {
    this.onChangedSearch.emit(['byProviderType', selectedProviderType, undefined]);
  }

  onPostCodeSearch (postCode) {
    this.onChangedSearch.emit(['byPostCode', postCode, undefined]);
  }

  onClickOfTestButton() {
  this.organisationService.testSourceStreamMethod(5);
  }

}
