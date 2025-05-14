import { TestBed } from '@angular/core/testing';

import { ResolveGuardGuard } from './resolve-guard.guard';

describe('ResolveGuardGuard', () => {
  let guard: ResolveGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResolveGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
