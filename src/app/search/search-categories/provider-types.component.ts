import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderType } from './provider-type';
import { ProviderTypesService } from './provider-types.service';

import { Organisation } from '../../organisations/organisation';
import { OrganisationService } from '../../organisations/index';


@Component({
  
  selector: 'provider-types',
  templateUrl: 'provider-types.component.html',
  styleUrls: ['provider-types.component.css']
})

export class ProviderTypesComponent implements OnInit {
  title = 'List of Provider Types';
  providerTypes: ProviderType[];
  filteredTypes: ProviderType[];
  selectedProviderType: ProviderType;
  organisations: Organisation[];

  private subTypes: any;
  private subOrgs: any;

  // Output that a provider type has been selected
  @Output() onSelectedProviderType = new EventEmitter<any>();

  constructor(
    private router: Router,
    private providerTypesService: ProviderTypesService,
    private organisationService: OrganisationService
  ) {}

  // When the component starts, get the organisations
  ngOnInit () {
    // Subscribe to Org Search Results
    this.subscribeToUnfilteredOrganisations();
    
    this.subscribeToProviderTypes();

    
  }

  ngOnDestroy(){
    if (this.subTypes) { this.subTypes.unsubscribe();}
    if (this.subOrgs) { this.subOrgs.unsubscribe();}
  }

  // Get provider types from the provider service,
  // then assigned the observable result to the Provider Types Array
  private subscribeToProviderTypes() {
    this.subTypes = this.providerTypesService.getProviderTypes()
      .subscribe(
        providerTypes => {
          console.log('providerTypes returned from API', providerTypes);
          
          this.providerTypes = this.providerTypesService.sortProviderTypes(providerTypes);
          this.filteredTypes = this.providerTypes;
        },
        error =>  console.log(error));
  }

private subscribeToUnfilteredOrganisations() {
  // this.organisationService.getCachedList();

    this.subOrgs = this.organisationService.orgListFull$
      .subscribe(
        organisations => {
          console.log('full orgs list updated:', organisations);
          this.organisations = organisations;
          this.filterTypes(this.organisations);
        },
        error =>  console.error(error)
      );
      
  }



  private filterTypes(orgs: Organisation[]){

    // console.log("filter types contained in Orgs: ", this.providerTypes);

    this.filteredTypes = this.providerTypes.filter( function( el ) {
      // console.log("filtering type: ", el,  orgs.filter(o => o.Category.includes(el.Value) ))
      return orgs.filter(o => o.Category.includes(el.Value) ).length > 0;
    } );

    console.log("filter types after reduced ", this.filteredTypes);
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
