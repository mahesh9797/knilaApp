import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() formData = null;
  @Output() submitEvent = new EventEmitter();
  userId: any;
  isValidated = false;
  contactForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',Validators.compose([ Validators.required, Validators.email])],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      id: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'].currentValue) {
      this.contactForm.setValue(changes['formData'].currentValue);
    }
  }
  ngOnInit(): void {}
  onFormSubmit(): void {
    this.isValidated = true;
    if (!this.contactForm.valid) {
      if (this.contactForm.controls['email'].errors && this.contactForm.controls['email'].errors['email']) {
        this.mainService.errorSubject$.next('Enter valid mail!');
        return;
      }

        this.mainService.errorSubject$.next('Enter the required fields!');      
        return;
    }
    this.submitEvent.emit();
  }
}
