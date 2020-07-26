import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @ViewChild('stepper') stepper;
  userNameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  snilsFormGroup: FormGroup;
  genderFormGroup: FormGroup;
  isEditable = false;
  user: User = {
    userName: '',
    dateOfBirth: '',
    gender: '',
    snils: '',
    };
  isSubmit = false;
  isDisabled = true;
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
              public userService: UserService) {}

  ngOnInit(): void {
    this.userNameFormGroup = new FormGroup({
      userName: new FormControl('', [
        Validators.pattern(/^[А-Я, а-я]/),
        Validators.required
      ])
    });
    this.birthFormGroup = new FormGroup({
      dateOfBirth: new FormControl('', [
        Validators.required
      ])
    });
    this.genderFormGroup = new FormGroup({
      gender: new FormControl('', [
        Validators.required
      ])
    });
    this.snilsFormGroup = new FormGroup({
      snils: new FormControl('', [
        Validators.required
      ])
    });
  }
  get _userName(): any {
    return this.userNameFormGroup.get('userName');
  }
  get _snils(): any {
    return this.snilsFormGroup.get('snils');
  }
  get _dateOfBirth(): any {
    return this.snilsFormGroup.get('dateOfBirth');
  }


  onHandleChange(event): void {
    console.log(event.value);
    this.genderFormGroup.get('gender').setValue(event.value);
  }
  onSubmit(): void {
    this.userService.user = {
      ...this.userNameFormGroup.value,
      ...this.birthFormGroup.value,
      ...this.genderFormGroup.value,
      ...this.snilsFormGroup.value
    };
    this.isSubmit = true;
    this.isDisabled = false;
  }

  addUser(): void {
    this.userService.addUser(this.userService.user);
    this.stepper.reset();
    this.isDisabled = !this.isDisabled;
  }
  // date(e): void {
  //   console.log(e.target.value);
  //   const date = e.target.value;
  //   const formatted = moment(date).format('DD MMMM YYYY');
  //   console.log(formatted);
  //   this.birthFormGroup.get('dateOfBirth').setValue(formatted);
  //   console.log(this.birthFormGroup);
  // }
  date(e): void {
    const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.birthFormGroup.get('dateOfBirth').setValue(convertDate, {
      onlyself: true
    });
  }


}
