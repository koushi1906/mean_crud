import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from './form.service';
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  visitorForm!: FormGroup;
  userData: any;
  editmenu: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.visitorForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.commonService.userData$.subscribe((userData) => {
      this.userData = userData;
      this.updateFormControls();
    });
  }

  updateFormControls() {
    if (this.userData) {
      this.visitorForm.patchValue({
        first_name: this.userData.first_name || '',
        last_name: this.userData.last_name || '',
        email: this.userData.email || '',
        phone: this.userData.phone || '',
      });
      this.editmenu = true;
      console.log(this.userData._id);
    }
  }

  onEdit() {
    if (this.visitorForm.valid) {
      const userId = this.userData._id;
      const updatedUserData = this.visitorForm.value;

      this.formService.updateUser(userId, updatedUserData).subscribe(
        (response) => {
          console.log('User updated', response);
          this.commonService.triggerRefresh();
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );

      this.visitorForm.reset();
      this.editmenu = false;
    } else {
      alert('Please fill the form correctly');
    }
  }

  onClear() {
    this.editmenu = false;
    this.visitorForm.reset();
  }

  onSubmit() {
    if (this.visitorForm.valid) {
      this.formService.createUser(this.visitorForm.value).subscribe(
        (response) => {
          console.log('User created', response);
          this.commonService.triggerRefresh();
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
      this.visitorForm.reset();
    }
  }
}
