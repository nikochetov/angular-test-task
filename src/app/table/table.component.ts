import { Component, OnInit, } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{

  constructor(public userService: UserService) {
  }
  displayedColumns: string[] = ['select', 'userName', 'birth', 'gender', 'snils'];
  selection = new SelectionModel<User>(true, []);
  isSelect = false;

  ngOnInit(): void {
  }
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.userService.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.userService.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  remove(): void {
    const ids: number[] = this.selection.selected.map(user => user.id);
    this.userService.USERS_DATA = this.userService.USERS_DATA.filter((user: User) => !ids.includes(user.id));
    this.userService.dataSource = new MatTableDataSource(this.userService.USERS_DATA);
    this.selection.clear();
  }
}

