import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/index';
import { SearchLocationComponent } from './search-location/search-location.component';
import { SearchKeywordComponent } from './search-keyword/search-keyword.component';
import { SearchStateComponent } from './search-state/search-state.component';

// import { ProviderType, Refiner } from './index';
// import { StateType } from './../shared/state-type';

import {
          // ProviderTypesComponent,
          // SearchLocationComponent,
          // SearchKeywordComponent,
          // SearchStateComponent,
          ProviderType,
          Refiner
        } from './index';

import { OrganisationService } from '../organisations/organisation.service'

@Component({
  moduleId: module.id,
  selector: 'refiner-options',
  templateUrl: 'refiner.component.html',
  directives: [ProviderTypesComponent, SearchLocationComponent, SearchKeywordComponent, SearchStateComponent],
  styleUrls: ['refiner.component.css']

})

export class RefinerComponent {
  title = 'Refiner Options';
  postCode: number;
  refiners: Refiner[];


  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) {}

  ngOnInit(){
    this.subscribeToRefiners();

  }

  private subscribeToRefiners() {
    this.organisationService.refinerList$
      .subscribe(
        refiners => this.updateRefiners(refiners),
        error =>  console.error(<any>error));
  }

  private updateRefiners(refiners: Refiner[]) {
    this.refiners = refiners;
    console.log('refiners updates - Refiner component');
  }

  onRefineProviderType (selectedProviderType: ProviderType) {
    if (selectedProviderType != null){
      console.log('filter provider type: ' + selectedProviderType.Value);
      this.organisationService.refineOrgList('byProviderType', selectedProviderType.Value, true);
    }else{
      console.log('cleared filter provider type');
      this.organisationService.clearRefinerProperty('byProviderType');
    }
  }

  // onSelectedRadius (radius) {
  //   this.organisationService.searchOrgList('byRadius', radius, undefined);
  // }

  onSelectedState (state) {
    this.organisationService.searchOrgList('byState', state, undefined);
  }


  onPostCodeSearch (postCode) {
    console.log('Org std Postcode search for postcode: ' + postCode);
    this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  }

  onAllOrganisations() {
    this.organisationService.searchOrgList('all', undefined, undefined);

  }

  // onKeywordSearch (keywordEntry) {
  //   this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
  // }



}
