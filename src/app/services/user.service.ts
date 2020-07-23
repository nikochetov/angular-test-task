import { Injectable } from '@angular/core';
import {User} from '../user';
import {MatTableDataSource} from "@angular/material/table";



@Injectable()
export class UserService {
  users: User[] = [
    ];
  dataSource = new MatTableDataSource(this.users);

  addToTable(user): void {
    this.users.push(user);
    this.dataSource = new MatTableDataSource<User>(this.users);
    console.log(this.users);
  }
}
