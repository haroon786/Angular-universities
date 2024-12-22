import { TestBed } from '@angular/core/testing';

import { UniversityListService } from './university-list.service';

describe('UniversityListService', () => {
  let service: UniversityListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
