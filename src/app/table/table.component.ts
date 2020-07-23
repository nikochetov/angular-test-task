import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {UserService} from '../services/user.service';
import {User} from '../user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [UserService]
})
export class TableComponent {

  constructor(private userService: UserService) {
  }
  displayedColumns: string[] = ['userName', 'birth', 'gender', 'snils'];
  data: User[] = this.userService.users;
}
