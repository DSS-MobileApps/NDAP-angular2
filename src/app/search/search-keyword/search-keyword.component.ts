import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'search-keyword',
  templateUrl: 'search-keyword.component.html',
  styleUrls: ['search-keyword.component.css']
})
export class SearchKeywordComponent implements OnInit {

  keyword: string;
  errorMessage: string;

  // Output that a provider type has been selected
  @Output() onKeywordSearch = new EventEmitter<string>();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSearch (keywordEntry) {
    // this.organisationService.searchOrgList('byKeyword', keywordEntry, undefined);
    
    this.onKeywordSearch.emit(keywordEntry)
  }



}
