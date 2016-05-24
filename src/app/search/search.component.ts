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
    
    <provider-types (onSelectedProviderType)="onSelectedProviderType($event)">></provider-types>
  </div>
  `,
  directives: [ProviderTypesComponent]
  // templateUrl: 'provider-types.component.html',
  // styleUrls: ['provider-types.component.css']
})

export class SearchComponent {
  title = 'Search Options';

  @Output() onChangedSearch = new EventEmitter<any[]>();

  constructor(
    private router: Router
  ) {}

  onSelectedProviderType (selectedProviderType: ProviderType) {
    this.onChangedSearch.emit(['byProviderType', selectedProviderType, undefined]);
  }

}
