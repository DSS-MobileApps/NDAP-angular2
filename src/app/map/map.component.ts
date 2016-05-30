import { Component, OnInit } from '@angular/core';

import { Organisation } from '../organisations/organisation';
import { OrganisationService } from '../organisations/organisation.service';

@Component({
  moduleId: module.id,
  selector: 'organisations',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']

})

export class MapComponent implements OnInit {
  organisations: Organisation[];
  selectedOrganisation: Organisation;

  constructor(
    private organisationService: OrganisationService
  ) 
  {}

  // When the component starts
  ngOnInit () {

  }
}
