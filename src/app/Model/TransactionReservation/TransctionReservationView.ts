import { ReservationRoomView } from "../ReservationRoom/ReservationRoom-View";
import { ReservationServiceViews } from '../ReservationService/reservationServiceViews';

export class TransctionReservationView {
        "ReservationId":number=0;
        "accountId":number= 0;
        "reservationDate":string='';
        "numberOfAttendees": number=0;
        "isFree": boolean=false;
        "bookingRequestImage": string='';
        "reservationRoomViews": ReservationRoomView [];
        "reservationServiceViews":ReservationServiceViews[];
      
}
