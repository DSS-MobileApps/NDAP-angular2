import { Component } from '@angular/core';
import { Router, OnActivate, RouteSegment } from '@angular/router';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

@Component({
  selector: 'my-organisation-detail',
  template: `
    <div *ngIf="organisation">
      <h2>{{organisation.Name}} details!</h2>
      <div><label>id: </label>{{organisation.Id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="organisation.Name" placeholder="name"/>
      </div>
    </div>
  `
})

export class OrganisationDetailComponent implements OnActivate {
  organisation: Organisation;

  constructor(
    private router: Router,
    private organisationService: OrganisationService
  ) {}

  routerOnActivate(curr: RouteSegment): void {
    // Grab the current ID from the URL
    let id = +curr.getParam('id');

    // Set organisation to the one returned
    this.organisationService.getOrganisation(id)
    .subscribe(organisation => this.organisation = organisation);
  }
}
