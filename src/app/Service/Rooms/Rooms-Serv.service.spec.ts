/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomsServService } from './Rooms-Serv.service';

describe('Service: RoomsServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomsServService]
    });
  });

  it('should ...', inject([RoomsServService], (service: RoomsServService) => {
    expect(service).toBeTruthy();
  }));
});
