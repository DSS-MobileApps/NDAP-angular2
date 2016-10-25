import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProviderTypesComponent } from './search-categories/index';

import {
  ProviderType,
  Refiner
} from './index';

import { OrganisationService } from '../organisations/organisation.service'
import { AnalyticsService } from '../shared/index';
import { ProviderTypesService } from './search-categories/index';


@Component({

  selector: 'refiner-options',
  templateUrl: 'refiner.component.html',
  styleUrls: ['refiner.component.css']

})

export class RefinerComponent {
  title = 'Refiner Options';
  postCode: number;
  refiners: Refiner[];
  @ViewChild(ProviderTypesComponent) private refinerComponent: ProviderTypesComponent;

  private subRefiners: any;
  private subSelectedType: any;

  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private typesService: ProviderTypesService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit() {
    this.subscribeToRefiners();

  }

  ngOnDestroy() {
    if (this.subRefiners) { this.subRefiners.unsubscribe(); }
    if (this.subSelectedType) { this.subSelectedType.unsubscribe(); }
  }

  private subscribeToRefiners() {
    this.subRefiners = this.organisationService.refiners
      .subscribe(
      refiners => this.updateRefiners(refiners),
      error => console.error(<any>error));
    this.subSelectedType = this.typesService.selectedType
      .subscribe(
      selected => this.refinerComponent.selectedProviderType = selected,
      error => console.error(<any>error));
  }

  private updateRefiners(refiners: Refiner[]) {
    this.refiners = refiners;
    if (this.refiners && this.refiners.length > 0) {
      // update existing refiner value
      // console.log('refiners updates - Refiner component');
    } else {
      // console.log('refiners updates - no refiners');
      this.refinerComponent.selectedProviderType = null;
    }

  }

  onRefineProviderType(selectedProviderType: ProviderType) {
    if (selectedProviderType != null) {
      // console.log('filter provider type: ' + selectedProviderType.Value);
      this.organisationService.refineOrgList('byProviderType', selectedProviderType.Value, true);
      this.typesService.updateSelectedType(selectedProviderType);
      this.analytics.sendUIEvent('Refine list', selectedProviderType.Value);

    } else {
      // console.log('cleared filter provider type');
      this.organisationService.clearRefinerProperty('byProviderType');
      this.typesService.updateSelectedType(null);
      this.analytics.sendUIEvent('Refine list', 'All');
    }
  }

  // onSelectedRadius (radius) {
  //   this.organisationService.searchOrgList('byRadius', radius, undefined);
  // }

  // onSelectedState(state) {
  //   this.organisationService.searchOrgList('byState', state, undefined);
  // }


  // onPostCodeSearch(postCode) {
  //   console.log('Org std Postcode search for postcode: ' + postCode);
  //   this.organisationService.searchOrgList('byPostCode', postCode, undefined);
  // }

  // onAllOrganisations() {
  //   this.organisationService.searchOrgList('all', undefined, undefined);

  // }

  // onKeywordSearch (keywordEntry) {
  //   this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
  // }



}
