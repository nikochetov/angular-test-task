import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface User {
  userName: string,
  birth: any,
  gender: string,
  snils: number
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  userNameFormGroup: FormGroup;
  birthFormGroup: FormGroup;
  snilsFormGroup: FormGroup;
  isEditable = false;
  gender: string

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit() {
    console.log({
      ...this.userNameFormGroup.value,
      ...this.birthFormGroup.value,
      gender: this.gender,
      ...this.snilsFormGroup.value
    });
  }

}
