import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, pipe } from 'rxjs';
import { AccountAdd } from 'src/app/Model/Account/AccountAdd';
import { IAccountView } from 'src/app/Model/Account/IAccount-view';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private AccountUrl: string =  'https://localhost:7289/api/Accuont';
  // private dataUpdatedSource = new Subject<void>();

  // dataUpdated$ = this.dataUpdatedSource.asObservable();
  constructor(private http: HttpClient) { }
  //**  get all acounts **
  GetAllAcounts(): Observable<IAccountView[]> {
    return this.http.get<IAccountView[]>(this.AccountUrl);
  
  }


  
  //**post a new Account **/
  PostAccount(Account:AccountAdd): Observable<any> {
return this.http.post<any>(this.AccountUrl,Account)
                  .pipe(map((res:any)=>{return res}));
      console.log(Account);       
  }

DeleteAccountById(id:number){
  return this.http.delete<IAccountView>(
                this.AccountUrl+"/"+id)
                .pipe(map(
                  (res:any)=>{return res;}
                ))
}


// **Update Account by Id */
UpdateAccount(Account:AccountAdd,id:number){
  return this.http.put(this.AccountUrl+"/"+id,Account)
                .pipe(map(
                  (res:any)=>{
                   // this.dataUpdatedSource.next();
                    return res}));

}

}