/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceServService } from './Service-Serv.service';

describe('Service: ServiceServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceServService]
    });
  });

  it('should ...', inject([ServiceServService], (service: ServiceServService) => {
    expect(service).toBeTruthy();
  }));
});
