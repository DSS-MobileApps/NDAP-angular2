import { Component, ElementRef, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MapService } from '../map/map.service';
import { Organisation } from './organisation';
import { OrganisationService } from './organisation.service';
import { EmailLink, PhoneLink, CommaSplitList, WebLink } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'organisation-detail',
  styleUrls: ['organisation-detail.component.css'],
  templateUrl: 'organisation-detail.component.html',
  pipes: [EmailLink, PhoneLink, CommaSplitList, WebLink],
  host: {'class' : 'ng-animate orgDetailContainer'}
})

export class OrganisationDetailComponent implements AfterViewInit  {
  @ViewChild('mapdetail') mapElement: ElementRef;
  @Input() organisation: Organisation;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private mapService: MapService
  ) {
  }


  ngOnInit() {

  }

  getOrganisation(organisation: Organisation){
    this.organisation = organisation;
    if (this.organisation){
      this.getOrganisationById(organisation.Id);
    }

  }

  getOrganisationById(id){
    this.organisationService.getOrganisation(id)
    .subscribe((organisation) => {
      this.organisation = organisation;
      this.initMap();
    });
  }



  ngAfterViewInit() {
    // this.initMap();
    this.sub = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        if (id > 0){
          console.log('id is ' + id);
          // Set organisation to the one returned
          this.getOrganisationById(id);
        }
      });

    this.organisationService.selectedOrganisation$
      .subscribe(
        selectedOrganisation => this.getOrganisation(selectedOrganisation),
        error =>  console.log(error));

  }

  initMap() {
    if (this.mapElement != null && this.organisation != null)
    {
      this.mapService.createDetailMap(this.mapElement.nativeElement, this.organisation)
    }
  }

  goBack() {
    // this.router.navigate(['/']);
    window.history.back();
  }
  deselect() {
    this.organisationService.updateSelectedOrganisation(null);
    this.router.navigate(['/']);
  }
}
