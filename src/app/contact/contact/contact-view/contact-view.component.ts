import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
})
export class ContactViewComponent implements OnInit {
  userList: any[] = [];
  sortInfo: any = {
    firstName: false,
    lastName: false,
    email: false,
    phoneNo: false,
    address: false,
    city: false,
    state: false,
    country: false,
    postalCode: false,
  };
  constructor(private router: Router) {}
  ngOnInit(): void {
    const storedUsers = localStorage.getItem('userList')!;
    this.userList = JSON.parse(storedUsers);
  }
  sortRows(columnName: string) {
    this.sortInfo[columnName] = !this.sortInfo[columnName];
    if (this.sortInfo[columnName]) {
      const sortedUsers = this.userList.sort(function (a: any, b: any): number {
        if (a[columnName].toLowerCase() < b[columnName].toLowerCase()) {
          return -1;
        }
        if (a[columnName].toLowerCase() > b[columnName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
      this.userList = sortedUsers;
    } else {
      const sortedUsers = this.userList.sort(function (a: any, b: any): number {
        if (b[columnName].toLowerCase() < a[columnName].toLowerCase()) {
          return -1;
        }
        if (b[columnName].toLowerCase() > a[columnName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
      this.userList = sortedUsers;
    }
  }
  onEditClick(id: number) {
    this.router.navigateByUrl(`app/contact/edit-contact/${id}`);
  }
}
