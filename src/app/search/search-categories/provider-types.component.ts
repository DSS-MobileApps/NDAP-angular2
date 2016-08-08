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

  private subTypes: any;

  // Output that a provider type has been selected
  @Output() onSelectedProviderType = new EventEmitter<any>();

  constructor(
    private router: Router,
    private providerTypesService: ProviderTypesService
  ) {}

  // When the component starts, get the organisations
  ngOnInit () {
    this.getProviderTypes();
  }

  ngOnDestroy(){
    if (this.subTypes) { this.subTypes.unsubscribe();}
  }

  // Get provider types from the provider service,
  // then assigned the observable result to the Provider Types Array
  getProviderTypes() {
    this.subTypes = this.providerTypesService.getProviderTypes()
      .subscribe(
        providerTypes => this.providerTypes = providerTypes,
        error =>  console.log(error));
  }

  // When a provider type is selected, tell the org list to filter by the type selected
  // This event is captured through the organisation.component html template
  onSelect(providerType) {
    // emit the provider value e.g. "All Disability"
    console.log(providerType);
    this.selectedProviderType = providerType;
    this.onSelectedProviderType.emit(providerType);
  }

}
