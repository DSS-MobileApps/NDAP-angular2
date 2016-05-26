import { Component } from '@angular/core';
import { Router, OnActivate, RouteSegment } from '@angular/router';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

@Component({
  selector: 'my-organisation-detail',
  template: `
    <div *ngIf="organisation">
    <button (click)="goBack()">Back</button>
      <h2>{{organisation.Name}} details!</h2>
      <div><label>id: </label>{{organisation.Id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="organisation.Name" placeholder="name"/>
      </div>
      <ul>
        <li>Category: {{organisation.Category}}</li>
        <li>Address: {{organisation.StreetAddress}}<br/>{{organisation.Suburb}} {{organisation.Postcode}}<br/>{{organisation.State}}</li>
        <li>Email: {{organisation.Email}}</li>
        <li>Phone: {{organisation.Phone}}</li>
        <li>PhoneE164: {{organisation.PhoneAsE164}}</li>
        <li>Fax: {{organisation.Fax}}</li>
        <li>Website: {{organisation.Website}}</li>
        <li>Lat/Lng: {{organisation.Lat}},{{organisation.Lng}}</li>
        <li>Distance: {{organisation.Distance}}</li>
      </ul>
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

  goBack() {
    window.history.back();
  }
}
