import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '@/app/services/auth.service';
import { switchMap } from 'rxjs';
import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InputErrorsComponent,
    FontAwesomeModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col justify-center bg-base-200 min-h-screen shadow-xl"
    >
      <div class="p-6 m-auto card bg-base-100 gap-4 shadow-xl min-w-[500px]">
        <h1 class="text-3xl font-semibold text-center">Sign In</h1>
        <span class="self-center">
          Don't have an account?
          <a class="link link-secondary" routerLink="/signup">Sign Up</a>
        </span>
        <button
          class="btn btn-outline btn-block"
          type="button"
          (click)="signInWithGoogle()"
        >
          Sign in with Google
          <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
        </button>
        <div class="divider my-1">OR</div>
        <form
          class="flex flex-col space-y-3"
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
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
              [control]="loginForm.get('email')!"
              errorMessageKeyName="email"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Password</span>
              <a
                routerLink="/forgot-password"
                class="label-text link no-underline text-accent float-right link-hover"
              >
                Forgot Password ?
              </a>
            </div>

            <input
              type="password"
              placeholder="Enter Password"
              class="w-full input input-bordered pr-11"
              formControlName="password"
            />
            <input-error-messages
              [control]="loginForm.get('password')!"
              errorMessageKeyName="password"
            />
          </label>
          <button class="btn btn-primary btn-block" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);
  authService = inject(AuthService);
  router = inject(Router);

  //Icons
  faEmail = faEnvelope;
  faEye = faEye;
  faClose = faEyeSlash;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /* Get errors */
  public handleErrorLogin = (controlName: string, errorName: string) => {
    return (
      this.loginForm.get(controlName)?.touched &&
      this.loginForm.get(controlName)?.errors &&
      this.loginForm.get(controlName)?.hasError(errorName)
    );
  };

  onSubmit() {
    if (
      !this.loginForm.valid ||
      !this.loginForm.value.email ||
      !this.loginForm.value.password
    )
      return;
    console.table(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.authService
      .login({
        email,
        password,
      })
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

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .pipe(
        switchMap(({ user: { uid, email, displayName } }) =>
          this.authService.addUser({
            uid,
            email: email!,
            displayName: displayName!,
            role: 'user',
          })
        ),
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
