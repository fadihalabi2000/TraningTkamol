import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CentersComponent } from 'src/Pages/Center-dashbord/Centers/Centers.component';
import { RoomsComponent } from 'src/Pages/Rooms-dashbord/Rooms/Rooms.component';
import { ServicesComponent } from 'src/Pages/Service-dashbord/Services/Services.component';
import { HomeComponent } from 'src/Pages/Home-dashbord/Home/Home.component';
import { NavbarComponent } from 'src/nav/navbar/navbar.component';
import { ReservatonComponent } from 'src/Pages/Reservation-Page/Reservaton/Reservaton.component';
import { AccountsComponent } from 'src/Pages/Account-dashbord/Accounts/Accounts.component';
import { FooterComponent } from './footer/footer.component';
import { ReservationCalenderComponent } from 'src/Pages/Reservation-calender/ReservationCalender/ReservationCalender.component';
import { LoginComponent } from 'src/Pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    CentersComponent,
    RoomsComponent,
    ServicesComponent,
    HomeComponent,
    NavbarComponent,
    ReservatonComponent,
    AccountsComponent,
    FooterComponent,
    ReservationCalenderComponent,
    LoginComponent
    ]
    ,
  imports: [
    BrowserModule,
    DataTablesModule ,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule 
   
    
    // RouterModule.forRoot(
     // [
    //     {path:'home',component:AppComponent},
     

    //     // {path:'Home',redirectTo:'Home',pathMatch:"full"},
    //     // {path:'**',redirectTo:'Home',pathMatch:"full"}
    // ]

    //)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
