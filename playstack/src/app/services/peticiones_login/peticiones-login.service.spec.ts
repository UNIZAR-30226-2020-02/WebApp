import { TestBed } from '@angular/core/testing';

import { PeticionesLoginService } from './peticiones-login.service';

describe('PeticionesLoginService', () => {
  let service: PeticionesLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
