import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { PostcodeService } from './postcode.service'


@Component({
    selector: 'search-postcode',
    templateUrl: './search-postcode.component.html',
    styleUrls: ['./search-postcode.component.css']
})
export class SearchPostcodeComponent implements OnInit, AfterViewInit {

    @Input() postCode: any;
    keyword: string;
    @Input() textPlaceholder = "Type...";
    selectedLocation: any;


    @ViewChild('locationInput') locInput: ElementRef;
    @ViewChild('searchBtn') searchBtn: ElementRef;

    // Output that a postcode has been selected
    @Output() onSearchEntered = new EventEmitter<any>();


    private pcLookupMax = 20;


    public query = '';
    public filteredList = [];


    constructor(
        private postcodeService: PostcodeService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.locInput && this.locInput.nativeElement) {
            this.locInput.nativeElement.focus();
        }

    }

    filter() {
        this.query = this.postCode;
        if (this.query !== "" && this.query.length > 2) {
            // this.filteredList = this.countries.filter(function (el) {
            //   return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            // }.bind(this));

            this.postcodeService.getPostcodesForLocations(this.query)
                .subscribe(
                results => {
                    console.log('postcode lookups', results);
                    let resultsLength = (results.length > this.pcLookupMax) ? this.pcLookupMax : results.length;
                    this.filteredList = results.slice(0, resultsLength);
                },
                error => console.error(error)
                );

        } else {
            this.filteredList = [];
        }

        // if (!isNaN(Number(this.query))) {
        //     this.postCode = Number(this.query);
        // }

    }

    select(item) {
        this.query = item.Postcode;
        this.postCode = item.Postcode;
        this.selectedLocation = item;
        this.filteredList = [];
        this.postcodeService.setSelectedLocation(item);
        if (this.searchBtn && this.searchBtn.nativeElement) {
            this.searchBtn.nativeElement.focus();
        }
    }


    // handleClick(event) {
    //   var clickedComponent = event.target;
    //   var inside = false;
    //   do {
    //     if (clickedComponent === this.elementRef.nativeElement) {
    //       inside = true;
    //     }
    //     clickedComponent = clickedComponent.parentNode;
    //   } while (clickedComponent);
    //   if (!inside) {
    //     this.filteredList = [];
    //   }
    // }

    onSearch(postcode) {
        this.onSearchEntered.emit(postcode);
    }

    get postcodeValid() {
        return this.postCode != null &&
            this.postCode.toString().length >= 3 &&
            !isNaN(this.postCode);
    }

    get postcodeWarning() {
        return this.postCode != null &&
            ((this.postCode.toString().length > 0 && this.postCode.toString().length < 3) ||
                isNaN(this.postCode));
    }

    get postcodeError() {
        return this.postCode != null &&
            this.postCode.toString().length > 3 &&
            (this.postCode.toString().length < 3 ||
                isNaN(this.postCode));
    }

}
