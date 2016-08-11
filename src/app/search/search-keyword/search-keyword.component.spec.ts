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
// import { SearchKeywordComponent } from './search-keyword.component';

// describe('Component: SearchKeyword', () => {
//   let builder: TestComponentBuilder;
//
//   beforeEachProviders(() => [SearchKeywordComponent]);
//   beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
//     builder = tcb;
//   }));
//
//   it('should inject the component', inject([SearchKeywordComponent],
//       (component: SearchKeywordComponent) => {
//     expect(component).toBeTruthy();
//   }));
//
//   it('should create the component', inject([], () => {
//     return builder.createAsync(SearchKeywordComponentTestController)
//       .then((fixture: ComponentFixture<any>) => {
//         let query = fixture.debugElement.query(By.directive(SearchKeywordComponent));
//         expect(query).toBeTruthy();
//         expect(query.componentInstance).toBeTruthy();
//       });
//   }));
// });
//
// @Component({
//   selector: 'test',
//   template: `
//     <app-search-keyword></app-search-keyword>
//   `,
//   directives: [SearchKeywordComponent]
// })
// class SearchKeywordComponentTestController {
// }
