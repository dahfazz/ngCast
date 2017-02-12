/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgCastService } from './ng-cast.service';

describe('NgCastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgCastService]
    });
  });

  it('should ...', inject([NgCastService], (service: NgCastService) => {
    expect(service).toBeTruthy();
  }));
});
