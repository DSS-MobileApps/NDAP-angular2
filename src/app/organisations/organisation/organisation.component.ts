import { Component, OnInit, AfterViewInit, Input, transition, animate, style, state, trigger } from '@angular/core';
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
  // host: {'class' : 'ng-animate orgContainer'}

  /* The element here always has the state "in" when it
   * is present. We animate two transitions: From void
   * to in and from in to void, to achieve an animated
   * enter and leave transition. The element enters from
   * the left and leaves to the right using translateX.
   */
  animations: [
    trigger('enterLeave', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
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
/** Use this subscribe if changing params within this same component */
    // this.subRoute = this.route
    //   .params
    //   .subscribe(params => {
    //     let id = +params['id'];
    //     if (id > 0){
    //       console.log('id is ' + id);
    //       // Set organisation to the one returned
    //       this.getOrganisationById(id);
    //     }
    //   });

    /** Use this if params never change in same component  ie. no router link to same component */
      // (+) converts string 'id' to a number
      let id = +this.route.snapshot.params['id'];
      this.getOrganisationById(id);

    this.sub = this.organisationService.selectedOrganisation$
      .subscribe(
        organisation => this.getOrganisation(organisation),
        error =>  console.log(error));

  }

  ngOnDestroy() {
    // this.subRoute.unsubscribe();
    this.sub.unsubscribe();
  }


  getOrganisation(organisation: Organisation){
    this.selectedOrganisation = organisation;
    if (this.selectedOrganisation){
      this.getOrganisationById(organisation.Id);
    }else{
      // this.goBack();
      // this.onUnselect(null);
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

  // goBack() {
  //   // this.router.navigate(['/']);
  //   window.history.back();
  // }
  // deselect() {
  //   this.organisationService.updateSelectedOrganisation(null);
  //   this.router.navigate(['/']);
  // }
  onUnselect(selectedOrg: Organisation) {
    // this.organisationService.updateSelectedOrganisation(null);
    console.group('Unselect Org:');
    console.log(selectedOrg);
    if (selectedOrg){
      this.router.navigate(['/organisations', {o: selectedOrg.Id}]);
    }else{
      this.router.navigate(['/organisations']);
    }
    console.groupEnd();
    // this.goBack();
  }

}
