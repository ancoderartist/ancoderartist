import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.listenForFormChanges();
  }

  listenForFormChanges(): void {
    this.parentForm.valueChanges.subscribe((_) => {
      const amount =
        this.parentForm.get('twoThousand')!.value * 2000 +
        this.parentForm.get('fiveHundred')!.value * 500 +
        this.parentForm.get('twoHundred')!.value * 200 +
        this.parentForm.get('oneHundred')!.value * 100 +
        this.parentForm.get('fifty')!.value * 50 +
        this.parentForm.get('twenty')!.value * 20 +
        this.parentForm.get('ten')!.value * 10;
      this.parentForm.patchValue({ totalAmount: amount }, { emitEvent: false });
    });
  }
}
