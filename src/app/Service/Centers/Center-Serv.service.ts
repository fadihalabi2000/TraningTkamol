import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceView } from '../../Model/Service/IService-View';
import { Observable, map } from 'rxjs';
import { ICenterView } from 'src/app/Model/Centers/ICenter-View';
import { CenterAdd } from 'src/app/Model/Centers/Center-Add';

@Injectable({
  providedIn: 'root'
})
export class CenterServService {

private CenterUrl: string =  'https://localhost:7289/api/Center';
//private dataUpdatedSource = new Subject<void>();

//dataUpdated$ = this.dataUpdatedSource.asObservable();
constructor(private http: HttpClient) { }
//**  get all acounts **
GetAllCenter(): Observable<ICenterView[]> {
  return this.http.get<ICenterView[]>(this.CenterUrl);

}



//**post a new Center **/
PostCenter(Center:CenterAdd): Observable<any> {
return this.http.post<any>(this.CenterUrl,Center)
                .pipe(map((res:any)=>{return res}));
    console.log(Center);       
}

DeleteCenterById(id:number){
return this.http.delete<ICenterView>(
              this.CenterUrl+"/"+id)
              .pipe(map(
                (res:any)=>{return res;}
              ))
}


// **Update Center by Id */
UpdateCenter(Center:CenterAdd,id:number){
return this.http.put(this.CenterUrl+"/"+id,Center)
              .pipe(map(
                (res:any)=>{
                 // this.dataUpdatedSource.next();
                  return res}));

}

}
