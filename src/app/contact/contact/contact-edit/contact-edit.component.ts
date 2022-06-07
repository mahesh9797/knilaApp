import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  @ViewChild('contactForm')
  contactForm!: ContactFormComponent;
  storedUsers: any;
  userList: any;
  userId:any;
  userData:any;
  constructor(private router: Router,private route:ActivatedRoute) {
 this.route.paramMap.subscribe((data:ParamMap)=>{
this.userId=data.get('id');
 });
  }
  ngOnInit(): void {
    this.storedUsers = localStorage.getItem('userList')!;
    this.userList = JSON.parse(this.storedUsers);   
    this.userData=this.userList[this.userId-1];
  }
  editContact() {  
    this.userList[this.userId-1] = this.contactForm.contactForm.value;
    localStorage.setItem('userList', JSON.stringify(this.userList));
    this.router.navigateByUrl('/app/contact/view-contact');
  }
}
