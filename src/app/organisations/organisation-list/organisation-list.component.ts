import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';
import { Organisation } from '../organisation';
// import { CommaSplitArray } from '../../shared/index';

@Component({

  selector: 'org-list',
  templateUrl: 'organisation-list.component.html',
  styleUrls: ['organisation-list.component.css'],
  // directives: [
  // ROUTER_DIRECTIVES
  // ],
  // pipes: [CommaSplitArray]
})
export class OrganisationListComponent implements OnInit, OnChanges {
  @Input() organisations: Organisation[];
  @Input() selectedOrgId: number;
  @Output() onSelectionChanged = new EventEmitter<Organisation>();

  public displayOrgs: Organisation[];

  constructor(private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: any) {

    // console.log('Change detected:', changes);
    if (changes.organisations) {
      console.log('Organisations Change detected:', changes.organisations);
      this.displayOrgs = [];
      this.ref.detectChanges();
      if (this.organisations) {
        this.displayOrgs = this.organisations;
      }
    }
  }

  onSelect(org: Organisation) {
    this.onSelectionChanged.emit(org);
    return false;
  }

}
