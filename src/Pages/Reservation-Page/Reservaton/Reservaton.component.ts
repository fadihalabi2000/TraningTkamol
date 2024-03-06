
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountView } from 'src/app/Model/Account/IAccount-view';
import { IReservation } from 'src/app/Model/Reservation/IReservation';
import { ReservationRoomViews } from 'src/app/Model/ReservationRoom/reservationRoomViews';
import { ReservationServiceViews } from 'src/app/Model/ReservationService/reservationServiceViews';
import { IRoomsView } from 'src/app/Model/Rooms/IRooms-View';
import { IServiceView } from 'src/app/Model/Service/IService-View';
import { ServiceView } from 'src/app/Model/Service/Service-View';
import { TransctionReservationView } from 'src/app/Model/TransactionReservation/TransctionReservationView';
import { AccountMovementServService } from 'src/app/Service/AccountMovement/AccountMovementServ.service';
import { AccountsService } from 'src/app/Service/Accounts/accounts.service';
import { ReservationServService } from 'src/app/Service/Reservation/Reservation-Serv.service';
import { ServiceServService } from 'src/app/Service/Services/Service-Serv.service';
import { TransactionReservationServService } from 'src/app/Service/TransactionReservation/TransactionReservationServ.service';
import { AccountMovementView, MovementStatus } from '../../../app/Model/Movement/AccountMovementView';


@Component({
  selector: 'app-Reservaton',
  templateUrl: './Reservaton.component.html',
  styleUrls: ['./Reservaton.component.css']
})



export class ReservatonComponent implements OnInit {
   // متغير لتحديد رقم الخطوة الحالية
   currentStep: number = 1;

   // متغيرات للبيانات المدخلة في الخطوات الثلاث
   resrvationobj:any={
    "accountId": 0,
    "reservationDate":new Date(),
    "numberOfAttendees": 0,
    "isFree": false,
    "bookingRequestImage": ''
   };

   transactionreservations: TransctionReservationView={
    "ReservationId":0,
    "accountId":0,
    "reservationDate":'',
    "numberOfAttendees":0,
    "isFree":false,
    "bookingRequestImage": '',
    "reservationRoomViews":[],
    "reservationServiceViews":[],
   }

   
   totalRoomPrice: number=0;
   totalServicePrice: number=0;
   totalPrice: number=0;
   reservationServiceViews:ReservationServiceViews[]=[];  //for send to transactionreservations
   reservationRoomViews:ReservationRoomViews[]=[];  //for send to transactionreservations
  //  reservationroomobj:ReservationRoomViews={
  //   "reservationId": 0,
  //   "roomId":0,
  //   "trainingStartDate":'',
  //   "trainingEndDate": '',
  //   "roomCostPerDay": 0,
  //   "trainingName":'',
  //  };
  accountmovement:AccountMovementView={
    reservationId: 0,
    movementValue: 0,
    status:MovementStatus.Negative,
    movementDate:'',
    accountId: 0,
    accountStatement:''
  }

   //ReservationService=new ReservationServiceView(); 

   // myService = new ServiceView();

    
   //image: File | null = null;
  selectaccount(){
  
    console.log("id ng model",this.resrvationobj.accountId)
  }

   public AllAccounts: IAccountView []= [];
  // selectedRooms: any[] = [];
   daysDifference:number=0;
 
  ////
  selectedStartDate:any='';
  selectedEndDate:any='';
  roomselectobj:any={

  };
 ///
   // Array to track selected services for display
   selectedServicesDisplay:any[]=[];
  
   constructor(private _reservationService:ReservationServService,
              private _Serviceservice:ServiceServService,
              private _accountservice:AccountsService,
              private _transactionreservation:TransactionReservationServService,
              private _AccountMovementService:AccountMovementServService)
              {}
               
  ngOnInit(): void {
   
    
  }
delect:string='';

  availableRooms: IRoomsView[] = [];
  public AllService: IServiceView[]=[];
 
  acc:any[]=[];
  GetAccounts(){
    this._accountservice.GetAllAcounts()
    .subscribe(res=>{
     this.AllAccounts=res;
     console.log( this.AllAccounts);
  
    })
   }

   /////////
    // Function to toggle service selection
  toggleServiceSelection(service: any,count:any): void {
    // Check if the service is already selected
    const displayIndex = this.selectedServicesDisplay.findIndex((s) => s.id === service.id);
  console.log("serv id",displayIndex);
  console.log(count);
    if (displayIndex === -1) {
      // If not selected, add it to the display array
      this.selectedServicesDisplay.push({ id: service.id, name: service.name, price: service.price });
console.log("service selected desp  :",this.selectedServicesDisplay);

      // Add corresponding entry to the array for sending to the database
      this.reservationServiceViews.push({
        reservationId: 1,
        serviceId: service.id,
        durationDays: this.daysDifference,
        numberofBeneficiaries: count,///cunt
        unitPrice: service.price,
        isFree: false
      });
     
      console.log(this.reservationServiceViews);
    } else {
      // If already selected, remove it from both arrays
      this.selectedServicesDisplay.splice(displayIndex, 1);
      this.reservationServiceViews.splice(displayIndex, 1);
    }
  
    console.log(this.reservationServiceViews);
  }
   onFileChange(event: any) {
    const file = event.target.files;
    if (file) {

      this.resrvationobj.bookingRequestImage = file.name;
    }
  }
  
  getAvailableRooms() {
    console.log(this.selectedEndDate,'',this.selectedStartDate);
    const start = new Date(this.selectedStartDate);
    const end = new Date(this.selectedEndDate);
  
    // Calculate the difference in milliseconds
    const timeDifference = end.getTime() - start.getTime()+1;
  
    // Convert the difference to days
     this.daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
     console.log("the deferance date is :",this.daysDifference);
    this._reservationService.getUnreservedRooms(this.selectedStartDate, this.selectedEndDate).subscribe(
      (rooms) => {
          this.availableRooms = rooms;
       
       
      },
      (error) => {
        console.error('Error fetching unreserved rooms:', error);
      }
    );
   }
 
  GetAllService(){
    this._Serviceservice.GetAllService().subscribe(res=>{
      this.AllService=res;
      console.log( this.AllService);
      for (let index = 0; index < this.AllService.length; index++) {
        this.acc[index]=this.resrvationobj.numberOfAttendees;
       console.log(this.resrvationobj.numberOfAttendees);
      }
      console.log(this.resrvationobj);
     })
    
    }
    
  roomIdArray: any[] = []; 

  send(roomId: any,nameroom:string, isChecked: any,) {
    console.log(`Room ID: ${roomId}, isChecked: ${isChecked}`);
    
    
    // إذا كان المربع محددًا، قم بإضافة roomId إلى المصفوفة إذا لم يكن موجودًا بالفعل
      if (!this.reservationRoomViews.includes(roomId)) {
        this.roomIdArray.push({reservationId:0, roomId: roomId,
          trainingStartDate:this.selectedStartDate,trainingEndDate:this.selectedEndDate,
           nameroom: nameroom ,roomCostPerDay:0,trainingName:'',});
        
      }
     else {
      // إذا لم يكن المربع محددًا، قم بحذف roomId من المصفوفة إذا كان موجودًا
      const index = this.roomIdArray.indexOf(roomId);
      if (index !== -1) {
        this.roomIdArray.splice(index, 1);
      }
    }
  
    // يمكنك استخدام this.roomIdArray كما تشاء في الدوال الأخرى أو طباعتها
    console.log('Current roomIdArray:', this.roomIdArray);
  }



   // دالة للانتقال إلى الخطوة التالية
   nextStep() {
    if(this.currentStep==1)
    {
      console.log(this.resrvationobj);
   
     
      this.GetAllService();
    }
    
    if(this.currentStep==3)
    {
     this.GetAllService();
    }
    if (this.currentStep < 4) {
      this.currentStep++;
    }

  }

  // دالة للعودة إلى الخطوة السابقة
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // دالة للتأكيد وإرسال البيانات
  confirm() {
    
     console.log('تم النقر على زر موافق');
     
     console.log("res",this.resrvationobj);
     console.log("serv", this.selectedServicesDisplay  );  
     console.log("servdb",this.reservationServiceViews);


     console.log("rooom",this.roomIdArray);
     this.roomIdArray.forEach((room) => {
      delete room.nameroom;
    });
   

    for (let index = 0; index < this.roomIdArray.length; index++) {
    //  reservationId:0
      this.transactionreservations.reservationRoomViews.push( this.roomIdArray[index]) ;
     this.totalRoomPrice += this.roomIdArray[index].roomCostPerDay;
     console.log("room price ", this.totalRoomPrice)
     }
     console.log("thid",this.transactionreservations.reservationRoomViews);




     // جمع القيم من المصفوفة resrvationobj.
     this.transactionreservations.ReservationId=1;
    this.transactionreservations.accountId = this.resrvationobj.accountId;
    this.transactionreservations.reservationDate = this.resrvationobj.reservationDate;
    this.transactionreservations.numberOfAttendees = this.resrvationobj.numberOfAttendees;
    this.transactionreservations.isFree = this.resrvationobj.isFree;
    this.transactionreservations.bookingRequestImage = this.resrvationobj.bookingRequestImage;



console.log("befor push" ,  this.transactionreservations.reservationServiceViews);
   for (let index = 0; index < this.reservationServiceViews.length; index++) {
    this.transactionreservations.reservationServiceViews.push( this.reservationServiceViews[index]) ;
  this.totalServicePrice+=( this.reservationServiceViews[index].unitPrice*this.reservationServiceViews[index].numberofBeneficiaries);
  console.log("Total service price", this.totalServicePrice);
  console.log("unit price", this.reservationServiceViews[index].unitPrice);
  console.log("pini",this.reservationServiceViews[index].numberofBeneficiaries);
   }



console.log("aftere push" ,  this.transactionreservations.reservationServiceViews);

console.log("this transaction",this.transactionreservations);

  //**this method to Add Anew transactionreservations */
    this._transactionreservation.PostTransactionReservation( 
                        this.transactionreservations).subscribe( (response) => {
                          const responseBody = response;
                          console.log('Response Body:', responseBody);
                       
                          this.resrvationobj.reservationId = responseBody.reservationId;
                          console.log(this.resrvationobj.reservationId);
                          // let ref=document.getElementById('closemodal');
                          // ref?.click();
                         alert("تمت اضافة الحجز بنجاح");
                         this.currentStep=4;
                         this.totalPrice=this.totalRoomPrice+this.totalServicePrice;
                  
                          this.accountmovement={
                            reservationId:this.resrvationobj.reservationId,
                            accountId:this.resrvationobj.accountId,
                            movementValue:this.totalPrice,
                            movementDate:this.resrvationobj.reservationDate,
                            status:MovementStatus.Negative,
                            accountStatement: ''
                          }
                          this._AccountMovementService.PostAccount(this.accountmovement).subscribe( (response) => {
                            const responseBody = response;
                            console.log('Response Body:', responseBody);
                           // console.log('id reservation:', responseBody.reservationId);
                          },
                          (error) => {
                           alert('حدث خطأ اثناء اضافة تكاليف  الحجز');
                           this._AccountMovementService.PostAccount(this.accountmovement)
                                          .subscribe( (response) => {
                                          const responseBody = response;
                                          console.log('Response Body:', responseBody);
                           });
                          });
                          
                        },
                        error=>{
                          alert("حدث خطأ اثناء اضافة الحجز رجاء المحاولة مرة أخرى");
                        }
                       
                      );
 
  }
  payed(){
    this.accountmovement={
      reservationId:this.resrvationobj.reservationId,
      accountId:this.resrvationobj.accountId,
      movementValue:this.totalPrice,
      movementDate:this.resrvationobj.reservationDate,
      status:MovementStatus.Positive,
      accountStatement: ''
    }
    console.log(this.accountmovement);
     this._AccountMovementService.PostAccount(this.accountmovement).subscribe( (response) => {
                            const responseBody = response;
                            console.log('Response Body:', responseBody);
                            alert('تمت عملية الدفع بنجاح ');
                              let ref=document.getElementById('closemodal');
                              ref?.click();
                      
                           // console.log('id reservation:', responseBody.reservationId);
                          },
                          (error) => {
                           alert('حدث خطأ اثناء اضافة تكاليف  الحجز');
                           this._AccountMovementService.PostAccount(this.accountmovement)
                                            .subscribe( (response) => {response=response});
                          });
  }
  // دالة لإلغاء العملية وإغلاق الديالوج
  cancel() {
    // إغلاق الديالوج
    this.currentStep = 1; // إعادة تعيين الخطوة الحالية
    // إعادة تعيين البيانات المدخلة للمتغيرات
  }


}





