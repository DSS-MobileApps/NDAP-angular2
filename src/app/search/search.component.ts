import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderType } from '../categories/provider-type';
import { ProviderTypesComponent } from '../categories/provider-types.component';

@Component({
  moduleId: module.id,
  selector: 'search-options',
  template: `
  <div class='search-area'>
    <h2>{{title}}</h2>

    <h3>Search by PostCode</h3>
    <button type="button" name="postCodeSearch" value="2602"
      (click)="onPostCodeSearch(postCode)">
      Press for {{postCode}} postcode search
    </button>
    <input [(ngModel)]="postCode" placeholder="PostCode"/>

    <h3>Search by Provider Type</h3>
    <provider-types (onSelectedProviderType)="onSelectedProviderType($event)">></provider-types>
  </div>
  `,
  directives: [ProviderTypesComponent]
  // templateUrl: 'provider-types.component.html',
  // styleUrls: ['provider-types.component.css']
})

export class SearchComponent {
  title = 'Search Options';
  postCode: number;

  @Output() onChangedSearch = new EventEmitter<any[]>();

  constructor(
    private router: Router
  ) {}

  onSelectedProviderType (selectedProviderType: ProviderType) {
    this.onChangedSearch.emit(['byProviderType', selectedProviderType, undefined]);
  }

  onPostCodeSearch (postCode) {
    this.onChangedSearch.emit(['byPostCode', postCode, undefined]);
  }

}
