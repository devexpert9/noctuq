import { TestBed } from '@angular/core/testing';

import { GuardLoginService } from './guard-login.service';

describe('GuardLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardLoginService = TestBed.get(GuardLoginService);
    expect(service).toBeTruthy();
  });
});
