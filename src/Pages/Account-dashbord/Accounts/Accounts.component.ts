import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { AccountAdd } from 'src/app/Model/Account/AccountAdd';
import { IAccountView } from 'src/app/Model/Account/IAccount-view';
import { AccountMovementView, MovementStatus } from 'src/app/Model/Movement/AccountMovementView';
import { IReservationView } from 'src/app/Model/Reservation/IReservationView';
import { AccountMovementServService } from 'src/app/Service/AccountMovement/AccountMovementServ.service';
import { AccountsService } from 'src/app/Service/Accounts/accounts.service';
import { ReservationServService } from 'src/app/Service/Reservation/Reservation-Serv.service';

@Component({
  selector: 'app-Accounts',
  templateUrl: './Accounts.component.html',
  styleUrls: ['./Accounts.component.css']
})
export class AccountsComponent implements OnInit {
  showadd!:boolean;
  showupdate!:boolean;
  showAddPyment!:boolean;
  hidebalanceFromUpdata:boolean=true;
  accountmodelobj=new AccountAdd(); 
oldBalance:number=0;
  public AllAccounts: IAccountView []= [];
  public Reservationlist!:IReservationView|null;
  dtTrigger:Subject<any>=new Subject<any>();
  selectedAccountId: number | null = null;
  indexForUpdate:number=0;
  pyment:number=0;
  formGroup:FormGroup=new FormGroup({

    accountname: new FormControl("",[Validators.required,Validators.pattern("^[ a-zA-Z][a-zA-Z ]*$")]),

    totalbalance: new FormControl("",[Validators.required])
  });
  title = 'TraningTkamol';
  dtOptions1: DataTables.Settings = {};
  accountmovement:AccountMovementView={
    movementValue: 0,
    status:MovementStatus.Negative,
    movementDate:new Date(),
    accountId: 0,
    accountStatement:''
  }
 


  constructor(private _formbuilder:FormBuilder,
    private _accountservice:AccountsService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private _AccountMovementService:AccountMovementServService,
    private _reservationServService:ReservationServService

  ) { }

  ngOnInit() {
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 7,
      retrieve: false
  }
 
 
        // Load DataTables state from localStorage
        const savedState = localStorage.getItem('dataTablesState');
        if (savedState) {
          const state = JSON.parse(savedState);
          this.dtOptions1 = {  pagingType: 'full_numbers',  pageLength: 7};
        }
    
        this.GetAccounts();
       
      }

          //**this method to get all Account */

  GetAccounts(){
    this._accountservice.GetAllAcounts()
    .subscribe(res=>{
     this.AllAccounts=res;
     console.log( this.AllAccounts);
     this.dtTrigger.next(null);
  
    
      localStorage.setItem('dataTablesState', JSON.stringify(this.dtOptions1));
    })
   }
      add(){
        this.showadd=true;
        this.showupdate=false;
        this.hidebalanceFromUpdata=true;
        console.log("Add",this.showadd,this.showupdate)
      }

      //**this method to Add Anew Account  */
  AddNewAccount(){
    this.accountmodelobj.accountName=this.formGroup.value.accountname;
    this.accountmodelobj.totalBalance=this.formGroup.value.totalbalance;
    console.log( this.accountmodelobj);
  
    this._accountservice.PostAccount(this.accountmodelobj).subscribe(
      (response) => {
        
        
        const responseBody = response;
        console.log('Response Body:', responseBody);
        let ref=document.getElementById('cancel');
        ref?.click();
         this.AllAccounts.push(this.accountmodelobj as IAccountView);
  
          this.cd.detectChanges();
      
  
       alert("تمت اضافة الحساب بنجاح ");
  
      
        this.formGroup.reset();
        
      },
      error=>{
        alert("حدث خطأ اثناء اضافة الحساب الرجاء المحاولة مرة اخرى");
      }
     
    );
    }
  //**this method to Delet  account */
   //**param  Account ,index */
   deleteAccount(Account: IAccountView, index: number) {
    if (confirm('Are You Sure To Delete???? Click Ok')) {
      // حذف العنصر من المصفوفة باستخدام splice
      this.AllAccounts.splice(index, 1);
      
      console.log('Updated Array:', this.AllAccounts);
      //location.reload();
      // قم بإجراء الحذف الفعلي من خلال استدعاء الخدمة أو الطلب API الخاص بك
      this._accountservice.DeleteAccountById(Account.id).subscribe(
        res => {
          alert("تم حذف الحساب بنجاح");
          console.log(res);
          this.router.navigateByUrl(this.router.url);
        },
        error => {
          alert("حدث خطا اثناء حذف الحساب الرجاء المحاولة مرة اخرى")
         
        }
      );
    }
  }



   //** intilaize form for update Account */
   IntilizeFormFormEdit(Account:IAccountView,index:number){
    this.showadd=false;
    this.showupdate=true;
    this.hidebalanceFromUpdata=false;
    this.indexForUpdate=index;
     this.selectedAccountId = Account.id; 
     this.formGroup.controls['accountname'].setValue(Account.accountName);
     this.formGroup.controls['totalbalance'].setValue(Account.totalBalance);
  
  
  }
  IntilizeFormForAddPayment(Account:IAccountView,index:number){
    this.showadd=false;
    this.showupdate=false;
    this.showAddPyment=true
    this.indexForUpdate=index;
    this.selectedAccountId = Account.id; 
     this.formGroup.controls['accountname'].setValue(Account.accountName);
     this.formGroup.controls['totalbalance'].setValue(Account.totalBalance);
     this.oldBalance=Account.totalBalance;
  }

  //**this method to Edit(update) inforation account */
  UpdataAccount(){
  this.accountmodelobj.accountName=this.formGroup.value.accountname;
  this.accountmodelobj.totalBalance=this.formGroup.value.totalbalance;


if (this.selectedAccountId !== null) {
  
  this._accountservice.UpdateAccount(this.accountmodelobj,this.selectedAccountId ).subscribe(
    (response) => {
      this.AllAccounts.splice(this.indexForUpdate, 1);
    
      console.log('after Updated Array:', this.AllAccounts);
      this.AllAccounts.push(this.accountmodelobj as IAccountView);

      this.cd.detectChanges();
      // قراءة الجسم (البيانات) من الاستجابة
       const responseBody = response;
       console.log('Response Body:', responseBody);
      let ref=document.getElementById('cancel');
      ref?.click();
     alert("تم تحديث معلومات الحساب بنجاح");

      this.formGroup.reset();
      
    },
    error=>{
      alert("حدث خطا اثناء معلومات الحساب الرجاء المحاولة مرة اخرى");
    }
   
  );
// console.log( "this a new obj",this.accountmodelobj,"and id",this.selectedAccountId );
this.formGroup.reset();
}
this.selectedAccountId = null;
 
  }
 
addPyment(){
  this.accountmodelobj.accountName=this.formGroup.value.accountname;
  this.pyment=this.formGroup.value.totalbalance;
console.log(this.pyment);
this.oldBalance+=this.pyment;
console.log("new balance",this.oldBalance);
this.accountmodelobj.totalBalance=this.oldBalance;
console.log(this.accountmodelobj);

if (this.selectedAccountId !== null) {
  // this obj to intilize movement account
  this.accountmovement={
    movementValue: this.oldBalance,
    status:MovementStatus.Positive,
    movementDate:new Date(),
    accountId: this.selectedAccountId ,
    accountStatement:''
  }
  this._accountservice.UpdateAccount(this.accountmodelobj,this.selectedAccountId ).subscribe(
    (response) => {
      this.AllAccounts.splice(this.indexForUpdate, 1);
    
      console.log('after Updated Array from pyment:', this.AllAccounts);
      this.AllAccounts.push(this.accountmodelobj as IAccountView);

      this.cd.detectChanges();
      // قراءة الجسم (البيانات) من الاستجابة
       const responseBody = response;
       console.log('Response Body:', responseBody);
      let ref=document.getElementById('cancel');
      ref?.click();
     alert("تمت اضافة الدفعة بنجاح  ");
 
   
     
      //this.GetReservation(this.selectedAccountId!);
      // 
      //this.accountmovement.reservationId = this.Reservationlist!.id;
     // console.log('res id', this.accountmovement.reservationId );
      this.AddPayment(this.accountmovement);
      console.log('after call movement');
      this.formGroup.reset();
      
    },
    error=>{
      alert("حدث خطا اثناء اضافة الدفعة الرجاء المحاولة مرة اخرى");
    }
   
  );
// console.log( "this a new obj",this.accountmodelobj,"and id",this.selectedAccountId );
this.formGroup.reset();
}
this.selectedAccountId = null;
}
 AddPayment(accountMovementView: AccountMovementView){
    this._AccountMovementService.PostAccount(accountMovementView).subscribe( (response) => {
      const responseBody = response;
      console.log('Response Body:', responseBody);
      alert("تمت عملية توثيق الدفعة بنجاح  ");
     
     // console.log('id reservation:', responseBody.reservationId);
    },
    (error) => {
     alert('حدث خطأ اثناء اضافة الدفعة الرجاء سيتم اعادة المحاولة بعد الضغط على موافق ');
    // إعادة إرسال طلب الحركة المالية في حالة الفشل 
      this.AddPayment(accountMovementView);
    });
  }
  
  GetReservation(accId:number){
    this._reservationServService.getReservation(accId)
    .subscribe(res=>{
     this.Reservationlist=res;
     
     console.log( this.Reservationlist!.id);
    });
   }
}

        

  

