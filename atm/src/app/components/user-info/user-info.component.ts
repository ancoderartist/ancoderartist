import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() atmFG!: FormGroup;
  userForm = false;
  userBalance = false;
  userInitialAmount: number = 0;
  totalAmount: number = 0;
  error = {
    visible: false,
    message: '',
  };

  constructor() {}

  ngOnInit(): void {}

  userAction(type: string): void {
    this.userInitialAmount = Number(this.parentForm.get('amount')?.value);
    this.userForm = true;
    switch (type) {
      case 'deposit':
        this.userNoteValue.reset();
        this.listenForFormChanges('deposit');
        break;
      case 'withdraw':
        this.userNoteValue.reset();
        this.listenForFormChanges('withdraw');
        break;
      case 'balance':
        this.userBalance = true;
        this.userNoteValue.reset();
        this.listenForFormChanges('balance');
        break;
    }
  }

  listenForFormChanges(type: string): void {
    this.userNoteValue.valueChanges.subscribe((_) => {
      this.error.visible = false;
      switch (type) {
        case 'deposit':
          this.calculateTotalAmount();
          this.depositAmount();
          break;
        case 'withdraw':
          this.calculateTotalAmount();
          this.withdrawAmount();
          break;
      }
    });
  }

  calculateTotalAmount(): void {
    this.totalAmount =
      this.userNoteValue.get('twoThousand')!.value * 2000 +
      this.userNoteValue.get('fiveHundred')!.value * 500 +
      this.userNoteValue.get('twoHundred')!.value * 200 +
      this.userNoteValue.get('oneHundred')!.value * 100 +
      this.userNoteValue.get('fifty')!.value * 50 +
      this.userNoteValue.get('twenty')!.value * 20 +
      this.userNoteValue.get('ten')!.value * 10;
  }

  depositAmount() {
    this.totalAmount = this.userInitialAmount + Number(this.totalAmount);
    this.parentForm.patchValue(
      { amount: this.totalAmount },
      { emitEvent: false }
    );
  }

  withdrawAmount() {
    if (this.totalAmount <= this.userInitialAmount - 500) {
      if (this.totalAmount < this.atmFG.get('totalAmount')?.value) {
        if (this.calculateNoteValues()) {
          this.totalAmount = this.userInitialAmount - Number(this.totalAmount);
          this.parentForm.patchValue(
            { amount: this.totalAmount },
            { emitEvent: false }
          );
        }
      } else {
        this.error.visible = true;
        this.error.message = 'Insufficient Balance in ATM';
      }
    } else {
      this.error.visible = true;
      this.error.message = 'Insufficient Balance in your account';
    }
  }

  calculateNoteValues() {
    switch (true) {
      case this.userNoteValue.get('twoThousand')!.value >
        this.atmFG.get('twoThousand')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 500 notes';
        break;
      case this.userNoteValue.get('fiveHundred')!.value >
        this.atmFG.get('fiveHundred')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 200 notes';
        break;
      case this.userNoteValue.get('twoHundred')!.value >
        this.atmFG.get('twoHundred')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 100 notes';
        break;
      case this.userNoteValue.get('oneHundred')!.value >
        this.atmFG.get('oneHundred')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 50 notes';
        break;
      case this.userNoteValue.get('fifty')!.value >
        this.atmFG.get('fifty')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 20 notes';
        break;
      case this.userNoteValue.get('twenty')!.value >
        this.atmFG.get('twenty')!.value:
        this.error.visible = true;
        this.error.message = 'Please use 10 notes';
        break;
      default:
        return true;
    }
    return false;
  }

  get userNoteValue() {
    return this.parentForm.get('noteValue') as FormGroup;
  }

  handleClick(action: boolean) {
    this.userForm = false;
  }
}
