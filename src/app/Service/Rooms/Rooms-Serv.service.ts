import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRoomsView } from 'src/app/Model/Rooms/IRooms-View';
import { RoomAdd } from 'src/app/Model/Rooms/Room-Add';

@Injectable({
  providedIn: 'root'
})
export class RoomsServService {

  private RoomsUrl: string =  'https://localhost:7289/api/Room';
  //private dataUpdatedSource = new Subject<void>();
  
  //dataUpdated$ = this.dataUpdatedSource.asObservable();
  constructor(private http: HttpClient) { }
  //**  get all acounts **
  GetAllRooms(): Observable<IRoomsView[]> {
    return this.http.get<IRoomsView[]>(this.RoomsUrl);
  
  }
  
  
  
  //**post a new Rooms **/
  PostRooms(Rooms:RoomAdd): Observable<any> {
  return this.http.post<any>(this.RoomsUrl,Rooms)
                  .pipe(map((res:any)=>{return res}));
      console.log(Rooms);       
  }
  
  DeleteRoomsById(id:number){
  return this.http.delete<IRoomsView>(
                this.RoomsUrl+"/"+id)
                .pipe(map(
                  (res:any)=>{return res;}
                ))
  }
  
  
  // **Update Rooms by Id */
  UpdateRooms(Rooms:RoomAdd,id:number){
  return this.http.put(this.RoomsUrl+"/"+id,Rooms)
                .pipe(map(
                  (res:any)=>{
                   // this.dataUpdatedSource.next();
                    return res}));
  
  }
  
}
