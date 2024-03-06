import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ICenterView } from 'src/app/Model/Centers/ICenter-View';
import { IRoomsView } from 'src/app/Model/Rooms/IRooms-View';
import { RoomAdd } from 'src/app/Model/Rooms/Room-Add';
import { CenterServService } from 'src/app/Service/Centers/Center-Serv.service';
import { RoomsServService } from 'src/app/Service/Rooms/Rooms-Serv.service';
import { ServiceServService } from 'src/app/Service/Services/Service-Serv.service';

@Component({
  selector: 'app-Rooms',
  templateUrl: './Rooms.component.html',
  styleUrls: ['./Rooms.component.css']
})
export class RoomsComponent implements OnInit {

  showadd!:boolean;
  showupdate!:boolean;
 Roommodelobj=new RoomAdd();
 RoommodelobjForupDate=new RoomAdd();
  public AllRooms: IRoomsView[]=[];
  public AllCenter:ICenterView[]=[];
  public CenterId:number=0;
  dtTrigger:Subject<any>=new Subject<any>();
  selectedserviceId: number | null = null;
  indexForUpdate:number=0;
  
  formGroup:FormGroup=new FormGroup({

    name: new FormControl("",[Validators.required,Validators.pattern("^[ a-zA-Z][a-zA-Z ]*$")]),

    capacity: new FormControl("",[Validators.required]),

    // selectedServiceId:new FormControl( ['', [Validators.required]]),
    centerId: new FormControl('',[Validators.required])
  });
  title = 'TraningTkamol';
  dtOptions1: DataTables.Settings = {};
 
 
  // formGroup = new FormGroup({

  // });
 
 onselect(state:any){
  console.log(state.target.value);
  this.CenterId=state.target.value;
  console.log(this.CenterId);
 }

  constructor(private _formbuilder:FormBuilder,
    private _Roomsservice:RoomsServService,
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

 this.GetAllRooms();
}
  

GetAllCenter(){
  this._centerservice.GetAllCenter().subscribe(res=>{
    this.AllCenter=res;
    console.log( this.AllCenter);
  
  
   
     localStorage.setItem('dataTablesState', JSON.stringify(this.AllCenter));
   })
  
  }
     //**this method to get all Service  */

GetAllRooms(){
  this._Roomsservice.GetAllRooms().subscribe(res=>{
    this.AllRooms=res;
    console.log( this.AllRooms);
    this.dtTrigger.next(null);
  
   
     localStorage.setItem('dataTablesState', JSON.stringify(this.dtOptions1));
   })
  
  }
  add(){
    this.GetAllCenter();
    this.showadd=true;
    this.showupdate=false;
    console.log("Add",this.showadd,this.showupdate)
  }

      AddNewRooms() {
        this.Roommodelobj.name = this.formGroup.value.name;
        this.Roommodelobj.capacity = this.formGroup.value.capacity;
        this.Roommodelobj.centerId = this.CenterId;
      
        this._Roomsservice.PostRooms(this.Roommodelobj).subscribe(
          (response) => {
            const responseBody = response;
            console.log('Response Body:', responseBody);
            console.log('id:', responseBody.id);
    
      
            let ref = document.getElementById('cancel');
            ref?.click();
            this.AllRooms.push(this.Roommodelobj as IRoomsView);
            this.cd.detectChanges();
      
            alert('تمت اضفة القاعة بنجاح');
      
            this.formGroup.reset();
          },
          (error) => {
            alert("حدث خطا اضافة القاعة الرجاء المحاولة مرة اخرى");
          }
        );
      }
      
        //**this method to Delet  account */
     //**param  Account */
     deleteRooms(Room: IRoomsView, index: number) {
      if (confirm('Are You Sure To Delete???? Click Ok')) {
        // حذف العنصر من المصفوفة باستخدام splice
        this.AllRooms.splice(index, 1);
        
        console.log('Updated Array:', this.AllRooms);
        //location.reload();
        // قم بإجراء الحذف الفعلي من خلال استدعاء الخدمة أو الطلب API الخاص بك
        this._Roomsservice.DeleteRoomsById(Room.id).subscribe(
          res => {
            alert("تم حذف القاعة بنجاح");
            console.log(res);
            this.router.navigateByUrl(this.router.url);
          },
          error => {
            alert("حدث خطا اثناء حذف القاعة الرجاء المحاولة مرة اخرى");
          }
        );
      }
    }
    //** intilaize form for update Service */
    IntilizeFormFormEdit(Room:IRoomsView,index:number){
      this.showadd=false;
      this.showupdate=true;
      this.indexForUpdate=index;
       this.selectedserviceId= Room.id; 
       this.formGroup.controls['name'].setValue(Room.name);
       this.formGroup.controls['price'].setValue(Room.capacity);
       this.formGroup.controls['centerId'].setValue(Room.centerId)
     
    }
  
   
   
    }
  



