/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CenterServService } from './Center-Serv.service';

describe('Service: CenterServ', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CenterServService]
    });
  });

  it('should ...', inject([CenterServService], (service: CenterServService) => {
    expect(service).toBeTruthy();
  }));
});
