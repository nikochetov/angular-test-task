import { Component, OnInit, } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit{

  constructor(public userService: UserService) {
  }
  displayedColumns: string[] = ['select', 'userName', 'birth', 'gender', 'snils'];

  ngOnInit(): void {
  }

  isAllSelected(): any {
    const numSelected = this.userService.selection.selected.length;
    const numRows = this.userService.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.userService.selection.clear() :
      this.userService.dataSource.data.forEach(row => this.userService.selection.select(row));
  }

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.userService.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}

