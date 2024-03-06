/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransactionReservationServService } from './TransactionReservationServ.service';

describe('Service: TransactionReservationServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionReservationServService]
    });
  });

  it('should ...', inject([TransactionReservationServService], (service: TransactionReservationServService) => {
    expect(service).toBeTruthy();
  }));
});
