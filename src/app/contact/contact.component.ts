import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css'],
  // directives: [ SearchComponent, MapComponent, OrganisationListComponent, OrganisationDetailComponent, RefinerComponent ],



})

export class ContactComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router
  ) {
  }

  // When the component starts,
  ngOnInit () {

  }

  ngAfterViewInit() {

  }


}
