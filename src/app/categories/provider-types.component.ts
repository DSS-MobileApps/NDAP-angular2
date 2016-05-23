import { Component, OnInit } from '@angular/core';
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
  errorMessage: string;

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
        error =>  this.errorMessage = <any>error);
  }

  // When an Org is selected from the list, navigate to that record in a detail view
  onSelect(providerType: ProviderType) {
    this.router.navigate(['/organisations', providerType.Code]);
    // this.selectedOrganisation = organisation;
  }

}
