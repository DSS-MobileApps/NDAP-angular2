import { Component, OnInit, transition, animate, style, state, trigger } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderType } from '../search/search-categories/provider-type';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

import { GeolocationService } from '../shared/geolocation.service';

import { SearchComponent } from '../search/search.component';
import { RefinerComponent } from '../search/refiner.component';

import { MapComponent } from '../map/map.component';

import { OrganisationDetailComponent } from './organisation-detail.component';


@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css'],
  directives: [ SearchComponent, MapComponent, OrganisationDetailComponent, RefinerComponent ],
  /**
   * Define two states, "inactive" and "active", and the end
   * styles that apply whenever the element is in those states.
   * Then define animations for transitioning between the states,
   * one in each direction
   */
  animations: [
    trigger('selectedState', [
      state('false', style({
        // backgroundColor: '#eee',
        // transform: 'translate(-100%, 0)'
      })),
      state('true',   style({
        // backgroundColor: '#cfd8dc',
        transform: 'translate(100%, 0)'
        // transform: 'translate(-33.3%, 0)'
      })),
      transition('false <=> true', animate('100ms ease-out')),
      // transition('active => inactive', animate('100ms ease-out'))
    ])
  ]

})

export class OrganisationsComponent implements OnInit {
  title = 'List of Organisations';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  errorMessage: string;
  userPos: any;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  }


  constructor(
    private router: Router,
    private organisationService: OrganisationService,
    private _geolocationService: GeolocationService
  ) {


  }

  // When the component starts,
  ngOnInit () {
    // Subscribe to Org Search Results
    this.organisationService.orgListSource$
  .subscribe(
    organisations => this.organisations = organisations,
    error =>  this.errorMessage = <any>error);

    // Perform a default search for all orgs
    this.organisationService.searchOrgList('all', undefined, undefined);

    // Subscribe to Selected Org events
    this.subscribeToSelectedOrganisationUpdates();
  }

  // When an Org is selected from the list, navigate to that record in a detail view
  onSelectDetailsButton(organisation: Organisation) {
    this.router.navigate(['/organisation', organisation.Id]);
    // this.selectedOrganisation = organisation;
  }

    // When a marker is clicked, tell the Org Service
  onSelect(selectedOrg: Organisation) {
    this.organisationService.updateSelectedOrganisation(selectedOrg);
  };

  // Be notified when a organisation is selected
  subscribeToSelectedOrganisationUpdates() {
  this.organisationService.selectedOrganisation$
    .subscribe(
      selectedOrganisation => this.selectedOrganisation = selectedOrganisation,
      error =>  console.log(error));
    }


    refreshPosition(){
      this._geolocationService.getLocation(this.opts);

    }

}
