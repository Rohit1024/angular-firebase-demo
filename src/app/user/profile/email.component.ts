import Validation from '@/app/auth/register/validation';
import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'user-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputErrorsComponent,
    FontAwesomeModule,
  ],
  template: `
    <div class="card bg-base-200 shadow-xl w-full -mt-6">
      <div class="card-body">
        <h2 class="card-title mt-3">Email</h2>
        <div>
          Update your email address
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
        <form [formGroup]="emailForm" (ngSubmit)="onSubmit()">
          <label class="form-control">
            <div class="label">
              <span class="label-text">New Email</span>
            </div>
            <input
              type="email"
              class="input input-bordered w-full"
              formControlName="newEmail"
            />
            <input-error-messages
              [control]="emailForm.get('newEmail')!"
              errorMessageKeyName="email"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Repeat Email</span>
            </div>
            <input
              type="email"
              class="input input-bordered pr-11 w-full"
              formControlName="repeatEmail"
            />
            <div class="label" *ngIf="emailForm.get('repeatEmail')?.hasError">
              <span
                class="label-text-alt text-error"
                *ngIf="handleErrors('repeatEmail', 'required')"
                >Repeat Email is Required</span
              >
              <span
                class="label-text-alt text-error"
                *ngIf="handleErrors('repeatEmail', 'matching')"
                >Emails Don't Match</span
              >
            </div>
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              type="password"
              class="w-full input input-bordered"
              formControlName="password"
            />
            <input-error-messages
              [control]="emailForm.get('password')!"
              errorMessageKeyName="password"
            />
          </label>
          <button class="btn btn-primary btn-block mt-4" type="submit">
            Update Email Address
          </button>
        </form>
      </div>
    </div>
  `,
})
export class UserEmailComponent {
  fb = inject(NonNullableFormBuilder);
  message = "You'll be Re-authenticated in order to change the Email";
  //Icons
  faInfo = faInfo;

  emailForm = this.fb.group(
    {
      newEmail: ['', [Validators.required, Validators.email]],
      repeatEmail: ['', Validators.required],
      password: ['', Validators.required],
    },
    {
      validators: Validation.match('newEmail', 'repeatEmail'),
    }
  );

  public handleErrors = (controlName: string, errorName: string) => {
    return (
      this.emailForm.get(controlName)?.touched &&
      this.emailForm.get(controlName)?.errors &&
      this.emailForm.get(controlName)?.hasError(errorName)
    );
  };

  onSubmit() {
    if (
      !this.emailForm.valid ||
      !this.emailForm.value.newEmail ||
      !this.emailForm.value.password
    )
      return;
    console.table(this.emailForm.value);
    const { newEmail, password } = this.emailForm.value;
  }
}
