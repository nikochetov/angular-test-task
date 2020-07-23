import { Injectable } from '@angular/core';
import {User} from "../user";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  addToTable(user) {
    this.users.push(user)
    console.log(this.users)
  }
}
