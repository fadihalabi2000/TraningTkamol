import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiceAdd } from '../../../app/Model/Service/Service-Add';
import { IServiceView } from 'src/app/Model/Service/IService-View';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ServiceServService } from 'src/app/Service/Services/Service-Serv.service';


@Component({
  selector: 'app-Services',
  templateUrl: './Services.component.html',
  styleUrls: ['./Services.component.css']
})
export class ServicesComponent implements OnInit {

  showadd!:boolean;
  showupdate!:boolean;
  servicemodelobj=new ServiceAdd();
  servicemodelobjForupDate=new ServiceAdd();
  public AllService: IServiceView[]=[];
  dtTrigger:Subject<any>=new Subject<any>();
  selectedserviceId: number | null = null;
  indexForUpdate:number=0;
  
  formGroup:FormGroup=new FormGroup({

    name: new FormControl("",[Validators.required,Validators.pattern("^[ a-zA-Z][a-zA-Z ]*$")]),

    price: new FormControl("",[Validators.required])
  });
  title = 'TraningTkamol';
  dtOptions1: DataTables.Settings = {};
 
 


  constructor(private _formbuilder:FormBuilder,
    private _Serviceservice:ServiceServService,
    private router: Router,
    private cd: ChangeDetectorRef

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

 this.GetAllService();
}
  
     //**this method to get all Service  */

GetAllService(){
  this._Serviceservice.GetAllService().subscribe(res=>{
    this.AllService=res;
    console.log( this.AllService);
    this.dtTrigger.next(null);
  
   
     localStorage.setItem('dataTablesState', JSON.stringify(this.dtOptions1));
   })
  
  }
  add(){
    this.showadd=true;
    this.showupdate=false;
    console.log("Add",this.showadd,this.showupdate)
  }
       //**this method to Add Anew Account  */
       AddNewService(){
        this.servicemodelobj.name=this.formGroup.value.name;
        this.servicemodelobj.price=this.formGroup.value.price;
        console.log( this.servicemodelobj);
      
        this._Serviceservice.PostService(this.servicemodelobj).subscribe(
          (response) => {
            
            
            const responseBody = response;
            console.log('Response Body:', responseBody);
            let ref=document.getElementById('cancel');
            ref?.click();
             this.AllService.push(this.servicemodelobj as IServiceView);
      
              this.cd.detectChanges();
          
      
           alert("تمت اضافة الخدمة بنجاح ");
      
          
            this.formGroup.reset();
            //this.router.navigateByUrl(this.router.url);
          },
          error=>{
            alert("حدث خطا اثناء اضافة الخدمة الرجاء المحاولة مرة اخرى");
          }
         
        );
        }
  
        //**this method to Delet  Service */
     //**param  Account */
     deleteService(Service: IServiceView, index: number) {
      if (confirm('Are You Sure To Delete???? Click Ok')) {
        // حذف العنصر من المصفوفة باستخدام splice
        this.AllService.splice(index, 1);
        
        console.log('Updated Array:', this.AllService);
      
        this._Serviceservice.DeleteServiceById(Service.id).subscribe(
          res => {
            alert("تم حذف الخدمة بنجاح");
            console.log(res);
            this.router.navigateByUrl(this.router.url);
          },
          error => {
            alert("حدث خطا اثناء حذف  الخدمة الرجاء المحاولة مرة اخرى");
          }
        );
      }
    }
    //** intilaize form for update Service */
    IntilizeFormFormEdit(Service:IServiceView,index:number){
      this.showadd=false;
      this.showupdate=true;
      this.indexForUpdate=index;
       this.selectedserviceId= Service.id; 
       this.formGroup.controls['name'].setValue(Service.name);
       this.formGroup.controls['price'].setValue(Service.price);
      
    
    }
  
    //**this method to Edit(update) inforation account */
    UpdatService(){
    this.servicemodelobj.name=this.formGroup.value.name;
    this.servicemodelobj.price=this.formGroup.value.location;
  
  
  if (this.selectedserviceId !== null) {
    
    this._Serviceservice.UpdateService(this.servicemodelobj,this.selectedserviceId ).subscribe(
      (response) => {
        this.AllService.splice(this.indexForUpdate, 1);
      
        console.log('after Updated Array:', this.AllService);
        this.AllService.push(this.servicemodelobj as IServiceView);
  
        this.cd.detectChanges();
        // قراءة الجسم (البيانات) من الاستجابة
         const responseBody = response;
         console.log('Response Body:', responseBody);
        let ref=document.getElementById('cancel');
        ref?.click();
       alert("تم تحديث معلومات الخدمة بنجاح");
  
        this.formGroup.reset();
        
      },
      error=>{
        alert("حدث خطأ اثناء تحديث معلومات القاعة الرجاء المحاولة مرة اخرى");
      }
     
    );
  // console.log( "this a new obj",this.servicemodelobj,"and id",this.selectedAccountId );
  this.formGroup.reset();
  }
  this.selectedserviceId = null;
   
    }
  
 
}
