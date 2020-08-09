import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateSNILS } from '../my.validators';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [],
})

export class CardComponent implements OnInit {

  @ViewChild('stepper') stepper;

  userNameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  snilsFormGroup: FormGroup;
  genderFormGroup: FormGroup;
  id = 0;
  editable = true;
  isSubmit = false;
  isDisabled = true;
  maxDate = new Date();
  mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/];

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    moment().format();
    this.userNameFormGroup = new FormGroup({
      userName: new FormControl('', [
        Validators.pattern(/^[А-Я, а-я]/),
        Validators.required,
      ]),
    });
    this.birthFormGroup = new FormGroup({
      dateOfBirth: new FormControl(),
    });
    this.genderFormGroup = new FormGroup({
      gender: new FormControl('', [
        Validators.required,
      ]),
    });
    this.snilsFormGroup = new FormGroup({
      snils: new FormControl('', [
        Validators.required,
        validateSNILS,
      ]),
    });
  }

  get _userName(): AbstractControl {
    return this.userNameFormGroup.get('userName');
  }

  get _snils(): AbstractControl {
    return this.snilsFormGroup.get('snils');
  }

  get _dateOfBirth(): AbstractControl {
    return this.birthFormGroup.get('dateOfBirth');
  }

  get _gender(): AbstractControl {
    return this.genderFormGroup.get('gender');
  }

  onHandleChange(event): void {
    this.genderFormGroup.get('gender').setValue(event.value);
  }

  onSubmit(): void {
    this.userService.user = {
      id: this.id += 1,
      ...this.userNameFormGroup.value,
      dateOfBirth: this.formatDate(this._dateOfBirth.value),
      ...this.genderFormGroup.value,
      ...this.snilsFormGroup.value,
    };
    this.isSubmit = true;
    this.isDisabled = false;
    this.editable = !this.editable;
  }

  addUser(): void {
    this.userService.usersData$.next([...this.userService.getUsers(), this.userService.user]);
    this.stepper.reset();
    this.isDisabled = !this.isDisabled;
    this.isSubmit = !this.isSubmit;
    this.editable = !this.editable;
  }

  formatDate(date): string {
    return moment(date).format('DD.MM.yyyy');
  }

  date({ value }): void {
    this._dateOfBirth.setValue(value);
  }
}
