/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostcodeService } from './postcode.service';

describe('Service: Postcode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostcodeService]
    });
  });

  it('should ...', inject([PostcodeService], (service: PostcodeService) => {
    expect(service).toBeTruthy();
  }));
});
