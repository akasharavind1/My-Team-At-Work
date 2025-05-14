import { TestBed } from '@angular/core/testing';

import { ServicefilesService } from './servicefiles.service';

describe('ServicefilesService', () => {
  let service: ServicefilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
