import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/Service/Authentcation/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   Auth:boolean = false;
   @Output() islogin:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.Auth=this._authService.loginAuto();
    // let token= localStorage.getItem("token");
    // if(token=="yes"){
    //   this.Auth= true;
 
      console.log(this.Auth);
    // }
    // else
    // this.Auth= false;
    // console.log(this.Auth);
  }

  exit(){
    this._authService.exit();
    this.islogin.emit(false);
    this.Auth=this._authService.loginAuto();
  }
  
}
