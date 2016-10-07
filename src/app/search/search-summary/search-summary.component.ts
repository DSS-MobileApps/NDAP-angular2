import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Organisation, OrganisationService, Refiner } from '../../index'
import { AnalyticsService } from '../../shared/index'


@Component({

  selector: 'search-summary',
  templateUrl: 'search-summary.component.html',
  styleUrls: ['search-summary.component.scss'],
  // directives: [],

})
export class SearchSummaryComponent implements OnInit {
  @Input() organisations: Organisation[];

  refiners: Refiner[];


  constructor( private analytics: AnalyticsService ) {}

  ngOnInit(){
    // this.subscribeToRefiners();

  }

  searchAgain(){
    console.log('search again from summary component');
    this.analytics.sendUIEvent('Search again', 'From search summary');
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
