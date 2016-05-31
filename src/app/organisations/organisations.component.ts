import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

import { SearchComponent } from '../search/search.component';

import { MapComponent } from '../map/map.component'

@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css'],
  directives: [ SearchComponent, MapComponent ]

})

export class OrganisationsComponent implements OnInit {
  title = 'List of Organisations';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  errorMessage: string;

  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) 
  {
  // organisationService.testSourceSteam$.subscribe(
  //     x => {
  //       this.testString = x;
  //     })
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

}
