import { Injectable } from '@angular/core';
import { User } from '../user';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({providedIn: 'root'})
export class UserService {
  user: User;
  USERS_DATA: User[] = [];
  dataSource = new MatTableDataSource(this.USERS_DATA);
  addUser(user): void {
    this.USERS_DATA.push(user);
    this.dataSource = new MatTableDataSource(this.USERS_DATA);
  }

}

