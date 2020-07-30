import { Injectable } from '@angular/core';
import { User } from '../user';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable({providedIn: 'root'})
export class UserService {
  user: User;
  USERS_DATA: User[] = [];
  dataSource = new MatTableDataSource(this.USERS_DATA);
  selection = new SelectionModel<User>(true, []);

  addUser(user): void {
    this.USERS_DATA.push(user);
    this.dataSource = new MatTableDataSource(this.USERS_DATA);
  }

  removeFromTable(): void {
    const ids: number[] = this.selection.selected.map(user => user.id);
    this.USERS_DATA = this.USERS_DATA.filter((user: User) => !ids.includes(user.id));
    this.dataSource = new MatTableDataSource(this.USERS_DATA);
    this.selection.clear();
  }

}

