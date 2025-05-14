import { TestBed } from '@angular/core/testing';

import { ServicefilesuserGuard } from './servicefilesuser.guard';

describe('ServicefilesuserGuard', () => {
  let guard: ServicefilesuserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServicefilesuserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
