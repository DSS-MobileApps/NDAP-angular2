import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderType } from './provider-type';
import { ProviderTypesService } from './provider-types.service';

@Component({
  moduleId: module.id,
  selector: 'provider-types',
  templateUrl: 'provider-types.component.html',
  styleUrls: ['provider-types.component.css']
})

export class ProviderTypesComponent implements OnInit {
  title = 'List of Provider Types';
  providerTypes: ProviderType[];
  selectedProviderType: ProviderType;

  // Output that a provider type has been selected
  @Output() onSelectedProviderType = new EventEmitter<ProviderType>();

  constructor(
    private router: Router,
    private providerTypesService: ProviderTypesService
  ) {}




  // When the component starts, get the organisations
  ngOnInit () {
    this.getProviderTypes();
  }

  // Get organisations from the service,
  // then assigned the returned promise to the Organisation Array
  getProviderTypes() {
    this.providerTypesService.getProviderTypes()
      .subscribe(
        providerTypes => this.providerTypes = providerTypes,
        error =>  console.log(error));
  }

  // When a provider type is selected, tell the org list to filter by the type selected
  onSelect(providerType: ProviderType) {
    // emit the provider value e.g. "All Disability"
    this.onSelectedProviderType.emit(providerType);
  }

}
