import { Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LandingComponent } from './global/landing.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/signin']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['/user']);

export const App_Routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('@/app/auth/login/login.component').then((c) => c.LoginComponent),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('@/app/auth/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('@/app/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@/app/user/user.routes').then((user) => user.user_routes),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
