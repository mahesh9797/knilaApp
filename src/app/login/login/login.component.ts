import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  userName = '';
  password = '';
  isValidated = false;
  constructor(private router: Router, private mainService: MainService) {}
  onLoginCLick(loginForm: NgForm) {
    this.isValidated = true;
    if (!loginForm.valid) {
      this.mainService.errorSubject$.next('Enter required fields!');
      return;
    }
    this.loginUser();
  }
  loginUser() {
    if (this.userName == 'admin' && this.password == 'admin') {
      this.router.navigateByUrl('/app');
    } else {
      this.getuserValidationStatus()
        ? this.router.navigateByUrl('/app')
        : this.mainService.errorSubject$.next('Invalid Username/Password !');
    }
  }
  getuserValidationStatus(): boolean {
    const storedUsers = localStorage.getItem('userList')!;
    if (!storedUsers) return false;
    const userList: any[] = JSON.parse(storedUsers);   
    if (
      userList.findIndex(
        (data) => data.email == this.userName
      ) != -1
    ) {
      return true;
    } else {
      return false;
    }
  }

}
