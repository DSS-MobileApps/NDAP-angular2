import { Component, OnInit, transition, animate, style, state, trigger, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css'],
  // directives: [ SearchComponent, MapComponent, OrganisationListComponent, OrganisationDetailComponent, RefinerComponent ],



})

export class AboutComponent implements OnInit, AfterViewInit {
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
