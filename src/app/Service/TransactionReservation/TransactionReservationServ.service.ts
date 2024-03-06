import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransctionReservationView } from '../../Model/TransactionReservation/TransctionReservationView';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionReservationServService {
private TransactionReservationUrl: string =  'https://localhost:7289/api/TransactionReservation/AddTransactionReservation';
constructor(private http:HttpClient) { }

//**post a new TransactionReservationS **/
PostTransactionReservation(TransactionReservationS:TransctionReservationView): Observable<any> {
  return this.http.post<any>(this.TransactionReservationUrl,TransactionReservationS)
                  .pipe(map((res:any)=>{return res}));
      console.log(TransactionReservationS);        
  }
}
