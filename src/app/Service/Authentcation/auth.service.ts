import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUserLogin } from 'src/app/Model/logininformation/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl='https://reqres.in/api/login';

constructor(private http :HttpClient, private router:Router){ }


login(data:IUserLogin):Observable<any>{
  return  this.http.post<any>(this.loginUrl,data).pipe(
    map( result=>{
      if(result.token){
        localStorage.setItem("token","yes");
      }}),
  catchError(err=>{
    let message='';
    if(err.error instanceof ErrorEvent){
      message=`Clientside Error happend: ${err.error.message}`;
    }
    else{
      message=`Email or Password Error
      Please confirm the information before trying again`;
    }
    alert(message);
    return throwError(()=>message);
  }));
}



loginAuto(){
  let token= localStorage.getItem("token");
  if(token=="yes"){
    return true;
  }
  else
  return false;
}



exit(){
  localStorage.setItem("token","");
   this.router.navigate(['/login']);

}


}








