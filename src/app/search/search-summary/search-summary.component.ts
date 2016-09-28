import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Organisation, OrganisationService, Refiner } from '../../index'


@Component({

  selector: 'search-summary',
  templateUrl: 'search-summary.component.html',
  styleUrls: ['search-summary.component.css'],
  // directives: [],

})
export class SearchSummaryComponent implements OnInit {
  @Input() organisations: Organisation[];

  refiners: Refiner[];


  constructor(  ) {}

  ngOnInit(){
    // this.subscribeToRefiners();

  }

  // private subscribeToRefiners() {
  //   this.organisationService.refinerList$
  //     .subscribe(
  //       refiners => this.updateRefiners(refiners),
  //       error =>  console.error(<any>error));
  // }
  //
  // private updateRefiners(refiners: Refiner[]) {
  //   this.refiners = refiners;
  //   console.log('refiners updates - Summary component');
  // }


}
