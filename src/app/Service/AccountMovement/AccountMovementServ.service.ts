import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountMovementView } from 'src/app/Model/Movement/AccountMovementView';

@Injectable({
  providedIn: 'root'
})
export class AccountMovementServService {

constructor(private http: HttpClient) { }
private AccountMovementUrl='https://localhost:7289/api/AccountMovements';
 //**post a new AccountMovement **/
 PostAccount(AccountMovement:AccountMovementView): Observable<any> {
  return this.http.post<any>(this.AccountMovementUrl,AccountMovement)
                    .pipe(map((res:any)=>{return res}));
        console.log(AccountMovement);       
    }
}
