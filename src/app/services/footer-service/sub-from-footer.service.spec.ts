import { TestBed } from '@angular/core/testing';

import { SubFromFooterService } from './sub-from-footer.service';

describe('SubFromFooterService', () => {
  let service: SubFromFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubFromFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
