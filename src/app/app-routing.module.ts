import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/Pages/Home-dashbord/Home/Home.component';
import { AccountsComponent } from '../Pages/Account-dashbord/Accounts/Accounts.component';
import { CentersComponent } from 'src/Pages/Center-dashbord/Centers/Centers.component';
import { RoomsComponent } from 'src/Pages/Rooms-dashbord/Rooms/Rooms.component';
import { ServicesComponent } from 'src/Pages/Service-dashbord/Services/Services.component';
import { ReservatonComponent } from 'src/Pages/Reservation-Page/Reservaton/Reservaton.component';
import { LoginComponent } from 'src/Pages/login/login.component';

const routes: Routes = [
  { path: 'Home', component:HomeComponent},
  { path: 'Accounts', component:AccountsComponent},
  { path: 'Centers', component:CentersComponent},
  { path: 'Rooms', component: RoomsComponent},
  { path: 'Services', component: ServicesComponent},
  { path: 'Reservation', component: ReservatonComponent},
  { path: 'login', component: LoginComponent},

       {path:'login',redirectTo:'login',pathMatch:"full"},
       {path:'**',redirectTo:'login',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
