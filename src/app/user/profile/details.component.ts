import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { AuthService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputErrorsComponent,
    RouterLink,
  ],
  template: `<div class="card bg-base-200 shadow-xl w-full -mt-6">
    <div class="card-body">
      <div>
        <h2 class="card-title mt-3">My Details</h2>
        <p>Manage your Profile Details</p>
      </div>
      <div class="divider my-0"></div>
      <form
        class="space-y-3"
        [formGroup]="updateDetailsForm"
        (ngSubmit)="onSubmit()"
      >
        <label class="form-control">
          <div class="label">
            <span class="label-text">Display Name</span>
          </div>
          <input
            type="email"
            class="input input-bordered w-full"
            [value]="user()?.displayName"
            formControlName="displayName"
          />
          <input-error-messages
            [control]="updateDetailsForm.get('displayName')!"
            errorMessageKeyName="displayName"
          />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Profile Image</span>
          </div>
          <input
            type="file"
            class="file-input file-input-bordered w-full"
            placeholder="Click here to upload an image"
            formControlName="repeatEmail"
          />
        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Email</span>
          </div>
          <input
            type="email"
            disabled
            [value]="user()?.email"
            class="w-full input input-bordered"
          />
          <div class="label">
            <a
              class="btn btn-ghost btn-sm label-text-alt"
              routerLink="/user/profile/email"
              >Update Email Address ?</a
            >
          </div>
        </label>
        <button class="btn btn-primary btn-block mt-4" type="submit">
          Update Profile Details
        </button>
      </form>
    </div>
  </div>`,
})
export class UserDetailsComponent implements OnInit {
  user = signal<User | null>(null);
  authService = inject(AuthService);
  toast = inject(HotToastService);

  ngOnInit(): void {
    this.setUserSignal();
  }

  setUserSignal() {
    this.authService.currentUser$.subscribe((data) => {
      this.user.set(data);
    });
  }

  fb = inject(NonNullableFormBuilder);

  updateDetailsForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: [''],
    photoURL: [''],
  });

  uploadImage() {}

  onSubmit() {
    const { displayName, phoneNumber, photoURL } = this.updateDetailsForm.value;
    if (!this.updateDetailsForm.valid || !displayName) return;
    this.authService
      .updateUser(this.user()!, {
        displayName,
      })
      .pipe(
        this.toast.observe({
          success: 'Profile Updated Successfully',
          loading: 'Loading...',
          error: 'Something went Wrong',
        })
      )
      .subscribe({
        error: console.log,
      });
  }
}
