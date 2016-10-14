import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Organisation, OrganisationService, Refiner } from '../../index'
import { AnalyticsService } from '../../shared/index'
import { AppState } from '../../app.service';


@Component({

  selector: 'search-summary',
  templateUrl: 'search-summary.component.html',
  styleUrls: ['search-summary.component.scss'],
  // directives: [],

})
export class SearchSummaryComponent implements OnInit, OnChanges {
  @Input() organisations: Organisation[];
  @Input() searchValue: string = '';

  refiners: Refiner[];


  constructor( private analytics: AnalyticsService,               
                public appState: AppState ) {}

  ngOnInit(){
    // this.subscribeToRefiners();
    // if (this.appState.get().searchType){

    // }
  }

  ngOnChanges(changes:any):void {
    if (changes.searchValue){
        var searchChange:string = changes.searchValue.currentValue;
        if (searchChange) {
          console.info('search changed', searchChange)
          
        }
    }
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
