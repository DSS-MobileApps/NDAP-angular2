import { Component, OnInit } from '@angular/core';

import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { OrganisationService } from './organisations/organisation.service';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationDetailComponent } from './organisations/organisation-detail.component';

import { ProviderTypesService } from './categories/provider-types.service';
import { SearchComponent } from './search/search.component';

@Component({
  moduleId: module.id,
  selector: 'angular2-service-finder-app',
  templateUrl: 'angular2-service-finder-app.component.html',
  styleUrls: ['angular2-service-finder-app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [OrganisationService, ProviderTypesService]
})

@Routes([
  {
    path: '/organisations/:id',
    component: OrganisationsComponent
  },
  {
    path: '/organisations',
    component: OrganisationsComponent
  },

  {
    path: '/organisation/:id',
    component: OrganisationDetailComponent
  },

  // Catch all for any undefined URL
  {
  path: '*',
  component: OrganisationsComponent
  }


])

export class Angular2ServiceFinderAppComponent implements OnInit  {
  title = 'Angular 2 Service Finder';

  constructor(private router: Router,
              private providerTypesService: ProviderTypesService
            ) {};

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
