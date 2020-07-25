import { Component, OnInit, } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{

  constructor(public userService: UserService) {
  }
  displayedColumns: string[] = ['userName', 'birth', 'gender', 'snils'];

  ngOnInit(): void {
  }
}

