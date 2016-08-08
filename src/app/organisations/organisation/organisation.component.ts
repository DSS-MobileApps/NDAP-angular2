import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Organisation } from '../index';
import { OrganisationDetailComponent } from './organisation-detail.component';
import { MapService } from '../../map/map.service';

import { OrganisationService } from '../organisation.service';

@Component({
  moduleId: module.id,
  selector: 'organisation',
  templateUrl: 'organisation.component.html',
  styleUrls: ['organisation.component.css'],
  directives: [ OrganisationDetailComponent ],
  host: {'class' : 'ng-animate orgContainer'}
})
export class OrganisationComponent implements OnInit, AfterViewInit {
  @Input() selectedOrganisation: Organisation;
  private sub: any;
  private subRoute: any;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private organisationService: OrganisationService,
    private mapService: MapService) {


      }

  ngOnInit() {
    // this.initMap();
    this.subRoute = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        if (id > 0){
          console.log('id is ' + id);
          // Set organisation to the one returned
          this.getOrganisationById(id);
        }
      });

    this.sub = this.organisationService.selectedOrganisation$
      .subscribe(
        organisation => this.getOrganisation(organisation),
        error =>  console.log(error));

  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
    this.sub.unsubscribe();
  }


  getOrganisation(organisation: Organisation){
    this.selectedOrganisation = organisation;
    if (this.selectedOrganisation){
      this.getOrganisationById(organisation.Id);
    }else{
      this.goBack();
    }

  }

  getOrganisationById(id){
    this.organisationService.getOrganisation(id)
    .subscribe((organisation) => {
      console.log('org is ' + organisation.Name);

      this.selectedOrganisation = organisation;
      // this.initMap();
    });
  }

  ngAfterViewInit() {

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
