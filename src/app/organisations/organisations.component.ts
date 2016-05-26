import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderType } from '../categories/provider-type';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

import { SearchComponent } from '../search/search.component';

@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css'],
  directives: [ SearchComponent ]

})

export class OrganisationsComponent implements OnInit {
  title = 'List of Organisations';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  errorMessage: string;
  
  testString = 'No Tests';

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

  // When the component starts, get the organisations
  ngOnInit () {
    this.organisationService.searchOrgList('all', undefined, undefined);
    
    this.organisationService.orgListSource$
      .subscribe(
        organisations => this.organisations = organisations,
        error =>  this.errorMessage = <any>error);
        
  }

  // When an Org is selected from the list, navigate to that record in a detail view
    onSelect(organisation: Organisation) {
    this.router.navigate(['/organisation', organisation.Id]);
    // this.selectedOrganisation = organisation;
  }

}
