import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProviderType } from '../search/search-categories/provider-type';

import { Organisation } from '../organisations/organisation';
// import { OrganisationListComponent, OrganisationDetailComponent, OrganisationService } from '../organisations/index';
// import { OrganisationService } from './organisation.service';
// import { OrganisationSummaryComponent } from './organisation-summary.component';
import { GeolocationService } from '../shared/geolocation.service';

// import { SearchComponent } from './index';
// import { RefinerComponent } from '../search/refiner.component';
// import { MapComponent, MapService } from '../map/index';

// import {RemoveSpaces} from '../shared/';

// import { OrganisationDetailComponent } from './organisation-detail.component';


@Component({

  selector: 'search-area',
  templateUrl: 'search-area.component.html',
  styleUrls: ['search-area.component.css'],
  // directives: [ SearchComponent ],
  // host: {'class' : 'ng-animate searchContainer'},

  /**
   * Define two states, "inactive" and "active", and the end
   * styles that apply whenever the element is in those states.
   * Then define animations for transitioning between the states,
   * one in each direction
   */
  // animations: [
  //   trigger('selectedState', [
  //     state('false', style({
  //       // backgroundColor: '#eee',
  //       // transform: 'translate(-100%, 0)'
  //     })),
  //     state('true',   style({
  //       // backgroundColor: '#cfd8dc',
  //       // transform: 'translate(100%, 0)'
  //       // transform: 'translate(-33.3%, 0)'
  //     })),
  //     transition('false <=> true', animate('100ms ease-out')),
  //     // transition('active => inactive', animate('100ms ease-out'))
  //   ])
  // ]
  /* The element here always has the state "in" when it
   * is present. We animate two transitions: From void
   * to in and from in to void, to achieve an animated
   * enter and leave transition. The element enters from
   * the left and leaves to the right using translateX.
   */
  animations: [
    trigger('enterLeave', [
      state('in', style({transform: 'translateY(0)'})),
      // transition('void => *', [
      //   style({transform: 'translateY(-100%)'}),
      //   animate(200)
      // ]),
      // transition('* => void', [
      //   animate(200, style({transform: 'translateY(100%)'}))
      // ])
    ])
  ]

})

export class SearchAreaComponent implements OnInit {
  // title = 'Search';
  // organisations: Organisation[];
  // selectedOrganisation: Organisation;
  // selectedOrgId: number;
  // errorMessage: string;
  // userPos: any;

  private sub: any;

  // width = 100;
  // height = 100;
  // height: number;

  searchMode=true;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  }


  constructor(
    private router: Router
    // private organisationService: OrganisationService,
    // private _geolocationService: GeolocationService
    // private mapService: MapService,
    // private elementRef: ElementRef
  ) {
  }

  // When the component starts,
  ngOnInit () {
    // Subscribe to Org Search Results
    // this.subscribeToOrganisations();
    // this.subscribeToSelectedOrganisationUpdates();

    // Perform a default search for all orgs
    // this.organisationService.searchOrgList('all', undefined, undefined);

    // this.organisationService.getCachedList();

    // Subscribe to Selected Org events



  }

  ngOnDestroy(){
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  onSearchTriggered () {
    console.log('Search area - search triggered');
    this.router.navigateByUrl('/organisations');
  }


  toggleSearchMode(){
    console.log('toggle search mode');
      this.searchMode = !this.searchMode;
      // this.router.navigateByUrl('/');
  }

}
