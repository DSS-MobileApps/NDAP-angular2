import { Component } from '@angular/core';
import { Router, OnActivate, RouteSegment } from '@angular/router';

import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';

@Component({
  selector: 'my-organisation-detail',
  template: `
<div *ngIf="organisation">   
    <div class="col-md-4 sideBar col-xs-12" id="leftSidePanelDetails">
    <div id="detailsPanel">
        <button class="btn btn-default" type="button"(click)="goBack()">Back to Results</button>
        <hr>
        <li>Category: {{organisation.Category}}</li>
        <li>Address: {{organisation.StreetAddress}}<br/>{{organisation.Suburb}} {{organisation.Postcode}}<br/>{{organisation.State}}</li>
        <li>Email: {{organisation.Email}}</li>
        <li>Phone: {{organisation.Phone}}</li>
        <li>PhoneE164: {{organisation.PhoneAsE164}}</li>
        <li>Fax: {{organisation.Fax}}</li>
        <li>Website: {{organisation.Website}}</li>
        <li>Lat/Lng: {{organisation.Lat}},{{organisation.Lng}}</li>
        <li>Distance: {{organisation.Distance}}</li>
        <hr>
        <p>Advocacy Services</p>
        <p>Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider,&nbsp;Text desciption from provider</p>
        <p>Provider Types</p>
        <ul> 
            <li>Lorem ipsum dolor sit amet</li>                             
            <li>Consectetur adipiscing elit</li>                             
            <li>Integer molestie lorem at massa</li>                             
        </ul>
        <p>Service Areas</p>
        <ul> 
            <li>Lorem ipsum dolor sit amet</li>                             
            <li>Consectetur adipiscing elit</li>                             
            <li>Integer molestie lorem at massa</li>                             
        </ul>
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

  goBack() {
    window.history.back();
  }
}
