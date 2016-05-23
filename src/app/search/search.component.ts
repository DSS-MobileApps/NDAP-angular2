import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from '../categories/provider-types.component';

@Component({
  moduleId: module.id,
  selector: 'search-options',
  template: `
  <div class='search-area'>
    <h2>Search options</h2>
    <provider-types></provider-types>
  </div>
  `,
  directives: [ProviderTypesComponent]
  // templateUrl: 'provider-types.component.html',
  // styleUrls: ['provider-types.component.css']
})

export class SearchComponent implements OnInit {
  title = 'Search Options';

  constructor(
    private router: Router
  ) {}

  // When the component starts, get the organisations
  ngOnInit () {
  }

}
