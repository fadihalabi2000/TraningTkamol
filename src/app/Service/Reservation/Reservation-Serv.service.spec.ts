/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReservationServService } from './Reservation-Serv.service';

describe('Service: ReservationServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationServService]
    });
  });

  it('should ...', inject([ReservationServService], (service: ReservationServService) => {
    expect(service).toBeTruthy();
  }));
});
