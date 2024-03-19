export class AccountMovementView {

  movementValue: number=0;
  status: MovementStatus=MovementStatus.Negative;
  movementDate: Date=new Date();
  accountId: number=0;
  accountStatement: string ='';
}

export enum MovementStatus {
    Negative = 0,
    Positive = 1,
  }