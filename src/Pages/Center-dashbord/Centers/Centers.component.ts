import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CenterAdd } from 'src/app/Model/Centers/Center-Add';
import { ICenterView } from 'src/app/Model/Centers/ICenter-View';
import { CenterServService } from 'src/app/Service/Centers/Center-Serv.service';

@Component({
  selector: 'app-Centers',
  templateUrl: './Centers.component.html',
  styleUrls: ['./Centers.component.css']
})
export class CentersComponent implements OnInit {
  showadd!:boolean;
  showupdate!:boolean;
  centermodelobj=new CenterAdd(); 
  centermodelobjForupDate=new CenterAdd(); 
  public AllCenter: ICenterView[]=[];
  dtTrigger:Subject<any>=new Subject<any>();
  selectedCenterId: number | null = null;
  indexForUpdate:number=0;
  
  formGroup:FormGroup=new FormGroup({

    name: new FormControl("",[Validators.required,Validators.pattern("^[ a-zA-Z][a-zA-Z ]*$")]),

    location: new FormControl("",[Validators.required,Validators.pattern("^[ a-zA-Z][a-zA-Z ]*$")])
  });
  title = 'TraningTkamol';
  dtOptions1: DataTables.Settings = {};
 
 


  constructor(private _formbuilder:FormBuilder,
    private _centerservice:CenterServService,
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

 this.GetAllCenter();
}
  
  
 

     //**this method to get all Center  */

GetAllCenter(){
this._centerservice.GetAllCenter().subscribe(res=>{
  this.AllCenter=res;
  console.log( this.AllCenter);
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
     AddNewCenter(){
      this.centermodelobj.name=this.formGroup.value.name;
      this.centermodelobj.location=this.formGroup.value.location;
      console.log( this.centermodelobj);
    
      this._centerservice.PostCenter(this.centermodelobj).subscribe(
        (response) => {
          
          
          const responseBody = response;
          console.log('Response Body:', responseBody);
          let ref=document.getElementById('cancel');
          ref?.click();
           this.AllCenter.push(this.centermodelobj as ICenterView);
    
            this.cd.detectChanges();
        
    
         alert("تمت اضافة المركز بنجاح");
    
        
          this.formGroup.reset();
          //this.router.navigateByUrl(this.router.url);
        },
        error=>{
          alert("حدث خطأ اثناء اضافة المركز الرجاء المحاولة مرة أخرى");
        }
       
      );
      }

      //**this method to Delet  account */
   //**param  Account */
   deleteCenter(Center: ICenterView, index: number) {
    if (confirm('Are You Sure To Delete???? Click Ok')) {
      // حذف العنصر من المصفوفة باستخدام splice
      this.AllCenter.splice(index, 1);
      
      console.log('Updated Array:', this.AllCenter);
      //location.reload();
      // قم بإجراء الحذف الفعلي من خلال استدعاء الخدمة أو الطلب API الخاص بك
      this._centerservice.DeleteCenterById(Center.id).subscribe(
        res => {
          alert("تم حذف الحجزالمركز بنجاح");
          console.log(res);
          this.router.navigateByUrl(this.router.url);
        },
        error => {
          alert("حدث خطا اثناء حذف المركز الرجاء المحاولة مرة اخرى") ;
        }
      );
    }
  }
  //** intilaize form for update Center */
  IntilizeFormFormEdit(Center:ICenterView,index:number){
    this.showadd=false;
    this.showupdate=true;
    this.indexForUpdate=index;
     this.selectedCenterId= Center.id; 
     this.formGroup.controls['name'].setValue(Center.name);
     this.formGroup.controls['location'].setValue(Center.location);
    
  
  }

  //**this method to Edit(update) inforation account */
  UpdatCenter(){
  this.centermodelobj.name=this.formGroup.value.name;
  this.centermodelobj.location=this.formGroup.value.location;


if (this.selectedCenterId !== null) {
  
  this._centerservice.UpdateCenter(this.centermodelobj,this.selectedCenterId ).subscribe(
    (response) => {
      this.AllCenter.splice(this.indexForUpdate, 1);
    
      console.log('after Updated Array:', this.AllCenter);
      this.AllCenter.push(this.centermodelobj as ICenterView);

      this.cd.detectChanges();
      // قراءة الجسم (البيانات) من الاستجابة
       const responseBody = response;
       console.log('Response Body:', responseBody);
      let ref=document.getElementById('cancel');
      ref?.click();
     alert("تم تحديث معلومات المركز بنجاح");

      this.formGroup.reset();
      
    },
    error=>{
      alert("حدث خطا اثناء تحديث معلومات المركز الرجاء المحاولة مرة اخرى");
    }
   
  );

this.formGroup.reset();
}
this.selectedCenterId = null;
 
  }
 
}
