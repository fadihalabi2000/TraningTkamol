import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IServiceView } from 'src/app/Model/Service/IService-View';
import { ServiceAdd } from 'src/app/Model/Service/Service-Add';

@Injectable({
  providedIn: 'root'
})
export class ServiceServService {


  private AccountUrl: string =  'https://localhost:7289/api/Service';
  // private dataUpdatedSource = new Subject<void>();

  // dataUpdated$ = this.dataUpdatedSource.asObservable();
  constructor(private http: HttpClient) { }
  //**  get all Service **
  GetAllService(): Observable<IServiceView[]> {
    return this.http.get<IServiceView[]>(this.AccountUrl);
  
  }


  
  //**post a new Account **/
  PostService(Service:ServiceAdd): Observable<any> {
return this.http.post<any>(this.AccountUrl,Service)
                  .pipe(map((res:any)=>{return res}));
      console.log(Service);       
  }

DeleteServiceById(id:number){
  return this.http.delete<IServiceView[]>(
                this.AccountUrl+"/"+id)
                .pipe(map(
                  (res:any)=>{return res;}
                ))
}


// **Update Account by Id */
UpdateService(Service:ServiceAdd,id:number){
  return this.http.put(this.AccountUrl+"/"+id,Service)
                .pipe(map(
                  (res:any)=>{
                   // this.dataUpdatedSource.next();
                    return res}));

}

}
