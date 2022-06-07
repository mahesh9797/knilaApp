import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  errorSubject$:Subject<any>=new Subject<any>();
  errContainer:HTMLDivElement=document.querySelector('.error-container')!;
  constructor() { 
    this.errorSubject$.subscribe(data=>{
     this.errContainer.style.display='block';
     this.errContainer.innerText=data;
     setTimeout(() => {      
      this.errContainer.style.display='none';
     }, 3000);
    });
  }

}
