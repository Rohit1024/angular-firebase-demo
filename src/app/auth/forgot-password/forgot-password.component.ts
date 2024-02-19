import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'auth-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorsComponent],
  template: `
    <div
      class="flex flex-col justify-center rounded-box bg-base-200 h-screen shadow-xl"
    >
      <div class="p-6 m-auto card bg-base-100 gap-4 shadow-xl min-w-[500px]">
        <h1 class="text-3xl font-semibold text-center">Forgot Password</h1>
        <span class="self-center">
          Remember your password?
          <a class="link link-secondary">Log in here</a>
        </span>
        <form
          class="space-y-auto"
          [formGroup]="forgotPasswordForm"
          (ngSubmit)="onSubmit(forgotPasswordForm)"
        >
          <label class="form-control">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Email Address"
              class="input input-bordered w-full"
              formControlName="email"
            />
            <input-error-messages
              [control]="forgotPasswordForm.get('email')!"
              errorMessageKeyName="email"
            />
          </label>
          <button class="btn btn-primary btn-block mt-4" type="submit">
            Send Password Reset Link
          </button>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class ForgotPasswordComponent {
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  /* Get errors */
  public handleErrorforgotPasswordForm = (
    controlName: string,
    errorName: string
  ) => {
    return (
      this.forgotPasswordForm.get(controlName)?.touched &&
      this.forgotPasswordForm.get(controlName)?.errors &&
      this.forgotPasswordForm.get(controlName)?.hasError(errorName)
    );
  };

  onSubmit(form: FormGroup) {
    if (!form.valid) this.toast.error('Submitted form is of invalid type');
    console.table(form.value);
  }
}
