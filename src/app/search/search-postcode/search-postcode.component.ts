import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { PostcodeService } from './postcode.service'


@Component({
    selector: 'search-postcode',
    templateUrl: './search-postcode.component.html',
    styleUrls: ['./search-postcode.component.css']
})
export class SearchPostcodeComponent implements OnInit, AfterViewInit {

    @Input() postCode: number;
    keyword: string;
    @Input() textPlaceholder = "Type...";
    selectedLocation: any;


    @ViewChild('locationInput') locInput: ElementRef;

    // Output that a provider type has been selected
    @Output() onSearchEntered = new EventEmitter<any>();


    private pcLookupMax = 20;


    public query = '';
    public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
        "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta",
        "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland",
        "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
        "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
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

        if (!isNaN(Number(this.query))) {
            this.postCode = Number(this.query);
        }

    }

    select(item) {
        this.query = item.Postcode;
        this.postCode = item.Postcode;
        this.selectedLocation = item;
        this.filteredList = [];
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
