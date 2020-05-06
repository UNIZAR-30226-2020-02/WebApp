import { TestBed } from '@angular/core/testing';

import { ReproductorService } from './reproductor.service';

describe('ReproductorService', () => {
  let service: ReproductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.apply(ReproductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
