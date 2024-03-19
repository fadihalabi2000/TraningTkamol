import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IReservationView } from 'src/app/Model/Reservation/IReservationView';
import { IRoomsView } from 'src/app/Model/Rooms/IRooms-View';

@Injectable({
  providedIn: 'root'
})
export class ReservationServService {

  private apiUrl = 'https://localhost:7289/api/TransactionReservation';
  private  ReservationApiUrl='https://localhost:7289/api/Reservation';
  constructor(private http: HttpClient) {}

  getUnreservedRooms(userStartDate: string, userEndDate: string): Observable<IRoomsView[]> {
    const url = `${this.apiUrl}/GetUnreservedRooms?userStartDate=${userStartDate}&userEndDate=${userEndDate}`;
    return this.http.get<IRoomsView[]>(url);
  }
 
  ///for get resservation
  getReservation(accountId:number):Observable<IReservationView | null>{
    return this.http.get<IReservationView[]>(this.ReservationApiUrl).pipe(
      map(reservations => {
        const filteredReservations = reservations.filter(reservation => reservation.accountId === accountId);
        return filteredReservations.length > 0 ? filteredReservations[filteredReservations.length - 1] : null;
      })
    );;
  }

}
