import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  atmFG!: FormGroup;
  userFG!: FormGroup;
  openUserForm = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.initAtmFG();
    this.initUserFG();
  }
  ngOnInit(): void {}

  initAtmFG(): void {
    this.atmFG = this.fb.group({
      totalAmount: 0,
      twoThousand: '',
      fiveHundred: '',
      twoHundred: '',
      oneHundred: '',
      fifty: '',
      twenty: '',
      ten: '',
    });
  }

  initUserFG(): void {
    this.userFG = this.fb.group({
      amount: '',
      noteValue: this.fb.group({
        twoThousand: '',
        fiveHundred: '',
        twoHundred: '',
        oneHundred: '',
        fifty: '',
        twenty: '',
        ten: '',
      }),
    });
  }

  enableUserForm(): void {
    if (this.atmFG.get('totalAmount')?.value) this.openUserForm = true;
  }

  disableUserForm(): void {
    this.openUserForm = false;
  }
}
