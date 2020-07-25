import { Injectable } from '@angular/core';
import {User} from '../user';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({providedIn: 'root'})
export class UserService {
  user: User;
  USERS_DATA: User[] = [];
  dataSource = new MatTableDataSource(this.USERS_DATA);
  addUser(user): any {
    this.USERS_DATA.push(user);
    this.dataSource = new MatTableDataSource(this.USERS_DATA);
  }
  removeUser(index): void {
    const data = this.dataSource.data;
    this.USERS_DATA = data.filter((user: User, idx: number) => idx !== index);
    this.dataSource = new MatTableDataSource(this.USERS_DATA);
  }
}

