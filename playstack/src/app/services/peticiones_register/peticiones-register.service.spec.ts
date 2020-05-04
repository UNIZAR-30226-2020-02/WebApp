import { TestBed } from '@angular/core/testing';

import { PeticionesRegisterService } from './peticiones-register.service';

describe('PeticionesRegisterService', () => {
  let service: PeticionesRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
