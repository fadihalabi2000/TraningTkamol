import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoomsView } from 'src/app/Model/Rooms/IRooms-View';

@Injectable({
  providedIn: 'root'
})
export class ReservationServService {

  private apiUrl = 'https://localhost:7289/api/TransactionReservation';

  constructor(private http: HttpClient) {}

  getUnreservedRooms(userStartDate: string, userEndDate: string): Observable<IRoomsView[]> {
    const url = `${this.apiUrl}/GetUnreservedRooms?userStartDate=${userStartDate}&userEndDate=${userEndDate}`;
    return this.http.get<IRoomsView[]>(url);
  }


}
