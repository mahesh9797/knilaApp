import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss'],
})
export class ContactAddComponent implements OnInit {
  @ViewChild('contactForm')
  contactForm!: ContactFormComponent;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  addContact() {
    const storedUsers = localStorage.getItem('userList')!;
    let userList;
    if (!storedUsers) {
      userList = [];
    } else {
      userList = JSON.parse(storedUsers);
    }
    userList.push({
      ...this.contactForm.contactForm.value,
      id: userList.length + 1,
    });
    localStorage.setItem('userList', JSON.stringify(userList));
    this.router.navigateByUrl('/app/contact/view-contact');
  }
}
