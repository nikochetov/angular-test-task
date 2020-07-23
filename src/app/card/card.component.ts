import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [UserService]
})
export class CardComponent implements OnInit {
  @ViewChild('stepper') stepper;
  userNameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  snilsFormGroup: FormGroup;
  isEditable = false;
  gender: string;
  user: User;
  isSubmit = false;
  isDisabled = false;


  constructor(private formBuilder: FormBuilder,
              public userService: UserService) {}

  ngOnInit(): void {
    this.userNameFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
    });
    this.birthFormGroup = this.formBuilder.group({
      birth: ['', Validators.required]
    });
    this.snilsFormGroup = this.formBuilder.group({
      snils: ['', Validators.required]
    });
  }

  onHandleChange(event): void {
    this.gender = event.value;
  }
  onSubmit(): void {
    this.user = {
      ...this.userNameFormGroup.value,
      ...this.birthFormGroup.value,
      gender: this.gender,
      ...this.snilsFormGroup.value
    };
    this.isSubmit = true;
    this.isDisabled = false;
    this.stepper.reset();
    console.log(this.isSubmit);
    console.log(this.user);
  }

  addToTable(): void {
    this.userService.addToTable(this.user);
    this.isDisabled = !this.isDisabled;
  }
}
