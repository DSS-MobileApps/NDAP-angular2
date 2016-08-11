// import {
//   beforeEach,
//   beforeEachProviders,
//   describe,
//   expect,
//   it,
//   inject,
// } from '@angular/core/testing';
// import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
// import { Component } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { SearchLocationComponent } from './search-location.component';

// describe('Component: SearchLocation', () => {
//   let builder: TestComponentBuilder;
//
//   beforeEachProviders(() => [SearchLocationComponent]);
//   beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
//     builder = tcb;
//   }));
//
//   it('should inject the component', inject([SearchLocationComponent],
//       (component: SearchLocationComponent) => {
//     expect(component).toBeTruthy();
//   }));
//
//   it('should create the component', inject([], () => {
//     return builder.createAsync(SearchLocationComponentTestController)
//       .then((fixture: ComponentFixture<any>) => {
//         let query = fixture.debugElement.query(By.directive(SearchLocationComponent));
//         expect(query).toBeTruthy();
//         expect(query.componentInstance).toBeTruthy();
//       });
//   }));
// });
//
// @Component({
//   selector: 'test',
//   template: `
//     <app-search-location></app-search-location>
//   `,
//   directives: [SearchLocationComponent]
// })
// class SearchLocationComponentTestController {
// }
