import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [UserService]
})
export class CardComponent implements OnInit {
  userNameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  snilsFormGroup: FormGroup;
  isEditable = false;
  gender: string
  user: User;


  constructor(private formBuilder: FormBuilder,
              public userService: UserService) {}

  ngOnInit() {
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
  isSubmit = false
  isDisabled = false

  onSubmit() {
    this.user = {
      ...this.userNameFormGroup.value,
      ...this.birthFormGroup.value,
      gender: this.gender,
      ...this.snilsFormGroup.value
    }
    this.isSubmit ? this.isSubmit : this.isSubmit = true
    this.isDisabled ? this.isDisabled = false : this.isDisabled
    console.log(this.isSubmit)
    console.log(this.user)
  }

  addToTable() {
    this.userService.addToTable(this.user)
    this.isDisabled = !this.isDisabled
  }
}
