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
  organisationService.testSourceSteam$.subscribe(
      x => {
        this.testString = x;
      })
  }

  // When the component starts, get the organisations
  ngOnInit () {
    this.getOrganisations('all', undefined, undefined);
  }
  // Get organisations from the service,
  // then assigned the returned observable to the Organisation Array
  getOrganisations(searchType, value1, value2) {
    this.organisationService.getOrganisations(searchType, value1, value2)
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
