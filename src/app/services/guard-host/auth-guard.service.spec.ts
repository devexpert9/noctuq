import { TestBed } from '@angular/core/testing';

import { AuthGuardHostService } from './auth-guard.service';

describe('AuthGuardHostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardHostService = TestBed.get(AuthGuardHostService);
    expect(service).toBeTruthy();
  });
});
