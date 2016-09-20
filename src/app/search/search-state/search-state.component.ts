import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StateType } from './../../shared/state-type';


@Component({
  
  selector: 'search-state',
  templateUrl: 'search-state.component.html',
  styleUrls: ['search-state.component.css']
})
export class SearchStateComponent implements OnInit {
  statelist: StateType[];
  errorMessage: string;

  // Output that a provider type has been selected
  @Output() onSelectedState = new EventEmitter<StateType>();


  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.statelist = [{code: 'ACT', name: 'Australian Capital Territory'},
                      {code: 'NSW', name: 'New South Wales'},
                      {code: 'NT', name: 'Northern Territory'},
                      {code: 'QLD', name: 'Queensland'},
                      {code: 'SA', name: 'South Australia'},
                      {code: 'TAS', name: 'Tasmania'},
                      {code: 'VIC', name: 'Victoria'},
                      {code: 'WA', name: 'Western Australia'}];
  }

  // When a state is selected, tell the org list to filter by the state selected
  onSelect(state: StateType) {
    // emit the state value e.g. "ACT"
    this.onSelectedState.emit(state);
  }

}
