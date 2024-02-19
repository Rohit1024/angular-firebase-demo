import Validation from '@/app/auth/register/validation';
import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { AuthService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'user-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputErrorsComponent,
    FontAwesomeModule,
  ],
  template: `
    <div class="card bg-base-200 shadow-xl w-full -mt-6 p-0">
      <div class="card-body">
        <h2 class="card-title mt-3">Password</h2>
        <div>
          Update your password
          <div
            class="tooltip tooltip-right ml-2 flex-wrap"
            attr.data-tip="{{ message }}"
          >
            <button class="btn btn-info btn-xs btn-circle">
              <fa-icon [icon]="faInfo" />
            </button>
          </div>
        </div>

        <div class="divider my-0"></div>
        <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
          <label class="form-control">
            <div class="label">
              <span class="label-text">Current Password</span>
            </div>
            <input
              type="password"
              class="input input-bordered w-full"
              formControlName="currentPassword"
            />
            <input-error-messages
              [control]="passwordForm.get('currentPassword')!"
              errorMessageKeyName="password"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">New Password</span>
            </div>
            <input
              type="password"
              class="input input-bordered pr-11 w-full"
              formControlName="newPassword"
            />
            <input-error-messages
              [control]="passwordForm.get('newPassword')!"
              errorMessageKeyName="password"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Repeat New Password</span>
            </div>
            <input
              type="password"
              class="w-full input input-bordered"
              formControlName="repeatNewPassword"
            />
            <div
              class="label"
              *ngIf="passwordForm.get('repeatNewPassword')?.hasError"
            >
              <span
                class="label-text-alt text-error"
                *ngIf="handleErrors('repeatNewPassword', 'required')"
                >Repeat New Password is Required</span
              >
              <span
                class="label-text-alt text-error"
                *ngIf="handleErrors('repeatNewPassword', 'matching')"
                >Password's Don't Match</span
              >
            </div>
          </label>
          <button class="btn btn-primary btn-block mt-6" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  `,
})
export class UserPasswordComponent {
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  message = "You'll be Re-authenticated in order to change the Password";
  //Icons
  faInfo = faInfo;

  passwordForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required],
    },
    {
      validators: Validation.match('newPassword', 'repeatNewPassword'),
    }
  );

  public handleErrors = (controlName: string, errorName: string) => {
    return (
      this.passwordForm.get(controlName)?.touched &&
      this.passwordForm.get(controlName)?.errors &&
      this.passwordForm.get(controlName)?.hasError(errorName)
    );
  };

  onSubmit() {
    if (
      !this.passwordForm.valid ||
      !this.passwordForm.value.currentPassword ||
      !this.passwordForm.value.newPassword
    )
      return;
    console.table(this.passwordForm.value);
    const { currentPassword, newPassword } = this.passwordForm.value;
    this.authService.reauthticateUser(currentPassword);
  }
}
