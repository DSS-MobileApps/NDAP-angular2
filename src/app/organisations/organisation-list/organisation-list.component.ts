import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Organisation } from '../organisation';
import { CommaSplitArray } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'org-list',
  templateUrl: 'organisation-list.component.html',
  styleUrls: ['organisation-list.component.css'],
  directives: [
    ROUTER_DIRECTIVES
  ],
  pipes: [CommaSplitArray]
})
export class OrganisationListComponent implements OnInit {
  @Input() organisations: Organisation[];
  @Input() selectedOrgId: number;
  @Output() onSelectionChanged = new EventEmitter<Organisation>();
  constructor() { }

  ngOnInit() { }


  onSelect(org: Organisation) {
    this.onSelectionChanged.emit(org);
  }

}
