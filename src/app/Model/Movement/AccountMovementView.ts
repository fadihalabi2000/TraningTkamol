export class AccountMovementView {

  reservationId: number=0;
  movementValue: number=0;
  status: MovementStatus=MovementStatus.Negative;
  movementDate:string='';
  accountId: number=0;
  accountStatement: string ='';
}

export enum MovementStatus {
    Negative = 0,
    Positive = 1,
  }