import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  displayedColumns: string[] = ['select', 'userName', 'birth', 'gender', 'snils'];
  selection = new SelectionModel<User>(true, []);
  dataSource: User[];

  ngOnInit(): void {
    this.userService.usersData$.subscribe(value => this.dataSource = value);
  }

  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  removeFromTable(): void {
    const ids: number[] = this.selection.selected.map(user => user.id);
    this.dataSource = this.dataSource.filter((user: User) => !ids.includes(user.id));
    this.userService.usersData$.next(this.dataSource);
    this.selection.clear();
  }
}

