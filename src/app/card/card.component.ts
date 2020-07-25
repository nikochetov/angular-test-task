import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  isEditable = false;
  gender: string;
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
    this.userNameFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
    });
    this.snilsFormGroup = this.formBuilder.group({
      snils: ['', Validators.required]
    });
    this.birthFormGroup = this.formBuilder.group({
      dateOfBirth: ['']
    });
  }
  onHandleChange(event): void {
    this.gender = event.value;
  }
  onSubmit(): void {
    this.userService.user = {
      ...this.userNameFormGroup.value,
      ...this.birthFormGroup.value,
      gender: this.gender,
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
