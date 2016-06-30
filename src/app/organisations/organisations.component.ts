import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderType } from '../search/search-categories/provider-type';

import { Organisation } from './organisation';
import { OrganisationListComponent } from './organisation-list.component';
import { OrganisationService } from './organisation.service';
// import { OrganisationSummaryComponent } from './organisation-summary.component';
import { GeolocationService } from '../shared/geolocation.service';
import { SearchComponent } from '../search/search.component';
import { MapComponent, MapService } from '../map/index';

@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'organisations.component.html',
  styleUrls: ['organisations.component.css'],
  directives: [ SearchComponent, MapComponent, OrganisationListComponent ] //, OrganisationSummaryComponent ]
})
export class OrganisationsComponent implements OnInit {
  title = 'List of Organisations';
  organisations: Organisation[];
  selectedOrganisation: Organisation;
  selectedOrgId: number;
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
    private _geolocationService: GeolocationService,
    private mapService: MapService
  ) {
  }

  // When the component starts,
  ngOnInit () {
    // Subscribe to Org Search Results
    this.subscribeToOrganisations();
    this.subscribeToSelectedOrganisationUpdates();

    // Perform a default search for all orgs
    this.organisationService.searchOrgList('all', undefined, undefined);

    // Subscribe to Selected Org events
    
  }

  // When an Org is selected from the list, navigate to that record in a detail view
  onSelectDetailsButton(organisation: Organisation) {
    this.router.navigate(['/organisation', organisation.Id]);
    // this.selectedOrganisation = organisation;
  }

    // When a marker is clicked, tell the Org Service
  onSelect(selectedOrg: Organisation) {
    this.mapService.selectMarker(selectedOrg.Id.toString()); 
  };

  // Be notified when a organisation is selected
  private subscribeToSelectedOrganisationUpdates() {
    this.mapService.markerSelected$
      .subscribe(
        selectedOrgId => this.updateSelected(+selectedOrgId),
        error =>  console.log(error));
  }

  private subscribeToOrganisations() {
    this.organisationService.orgListSource$
      .subscribe(
        organisations => this.updateOrganisations(organisations),
        error =>  this.errorMessage = <any>error);
  }

  private updateSelected(id: number) {
    this.selectedOrgId = id;
  }

  private updateOrganisations(organisations: Organisation[]) {
    this.organisations = organisations
  }
      
  refreshPosition(){
    this._geolocationService.getLocation(this.opts);
  }
}
