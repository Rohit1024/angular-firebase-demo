import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Validation from './validation';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '@/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputErrorsComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col justify-center bg-base-200 min-h-screen shadow-xl"
    >
      <div class="p-6 m-auto card bg-base-100 gap-4 shadow-xl min-w-[500px]">
        <h1 class="text-3xl font-semibold text-center">Sign Up</h1>
        <span class="self-center">
          Already have an account?
          <a class="link link-secondary" routerLink="/signin">Sign in</a>
        </span>
        <button
          class="btn btn-outline btn-block"
          type="button"
          (click)="signInWithGoogle()"
        >
          Create with Google
          <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
        </button>
        <div class="divider my-0">OR</div>
        <form
          class="space-y-2"
          [formGroup]="registerForm"
          (ngSubmit)="onSubmit()"
        >
          <label class="form-control">
            <div class="label">
              <span class="label-text">Display Name</span>
            </div>
            <input
              type="text"
              placeholder="John Doe"
              class="input input-bordered w-full"
              formControlName="displayName"
            />
            <input-error-messages
              [control]="registerForm.get('displayName')!"
              errorMessageKeyName="displayName"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              class="input input-bordered w-full"
              formControlName="email"
            />
            <input-error-messages
              [control]="registerForm.get('email')!"
              errorMessageKeyName="email"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              class="input input-bordered pr-11 w-full"
              formControlName="password"
            />
            <input-error-messages
              [control]="registerForm.get('password')!"
              errorMessageKeyName="password"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              class="w-full input input-bordered"
              formControlName="confirmPassword"
            />
            @if(registerForm.get('confirmPassword')?.hasError) {
            <div class="label">
              @if(handleErrorRegister('confirmPassword', 'required')) {
              <span class="label-text-alt text-error"
                >Confirm Password is Required</span
              >
              } @if(handleErrorRegister('confirmPassword', 'matching')){
              <span class="label-text-alt text-error"
                >Passwords should match</span
              >
              }
            </div>
            }
          </label>
          <button class="btn btn-primary btn-block mt-4" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group(
    {
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: Validation.match('password', 'confirmPassword'),
    }
  );

  /* Get errors */
  public handleErrorRegister = (controlName: string, errorName: string) => {
    return (
      this.registerForm.get(controlName)?.touched &&
      this.registerForm.get(controlName)?.errors &&
      this.registerForm.get(controlName)?.hasError(errorName)
    );
  };

  onSubmit() {
    const { displayName, email, password } = this.registerForm.value;
    if (!this.registerForm.valid || !displayName || !email || !password) return;
    console.table(this.registerForm.value);

    this.authService
      .register({
        email,
        password,
      })
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.authService.addUser({
            uid,
            email,
            displayName,
            role: 'user',
          })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: 'Something Wrong Happened',
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: ({ code }) => this.toast.error(`Error : ${code}`),
      });
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'Something Wrong Happened',
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: ({ code }) => this.toast.error(`Error : ${code}`),
      });
  }
}
