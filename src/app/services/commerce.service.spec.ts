import { TestBed } from '@angular/core/testing';

import { CommerceService } from './commerce.service';

describe('CommerceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommerceService = TestBed.get(CommerceService);
    expect(service).toBeTruthy();
  });
});
