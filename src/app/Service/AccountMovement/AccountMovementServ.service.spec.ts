/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountMovementServService } from './AccountMovementServ.service';

describe('Service: AccountMovementServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountMovementServService]
    });
  });

  it('should ...', inject([AccountMovementServService], (service: AccountMovementServService) => {
    expect(service).toBeTruthy();
  }));
});
