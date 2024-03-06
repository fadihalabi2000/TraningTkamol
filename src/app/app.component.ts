import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AccountAdd } from './Model/Account/AccountAdd';
import { AccountsService } from './Service/Accounts/accounts.service';
import { IAccountView } from './Model/Account/IAccount-view';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string="app component"
  constructor( ) { }
              ngOnInit() {
              
                };
            
                

}

