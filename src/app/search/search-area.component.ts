import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Organisation } from '../organisations/organisation';
import { GeolocationService } from '../shared/geolocation.service';



@Component({

  selector: 'search-area',
  templateUrl: 'search-area.component.html',
  styleUrls: ['search-area.component.scss'],
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
  private sub: any;
  searchMode=true;

  opts = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  }


  constructor(private router: Router) {
  }

  // When the component starts,
  ngOnInit () {

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
