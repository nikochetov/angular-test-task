import { Injectable } from '@angular/core';
import { User } from '../user';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {

  user: User;
  usersData$ = new BehaviorSubject([]);


  getUsers(): User[] {
    return this.usersData$.value;
  }
}
