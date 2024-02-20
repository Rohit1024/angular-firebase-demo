import { Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LandingComponent } from './global/landing.component';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { LoginComponent } from '@/app/features/auth/login/login.component';
import { RegisterComponent } from '@/app/features/auth/register/register.component';
import { ForgotPasswordComponent } from '@/app/features/auth/forgot-password/forgot-password.component';
import { SecureLayoutComponent } from './layouts/secure-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/signin']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['/dashboard']);

export const App_Routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'home',
        component: LandingComponent,
      },
      {
        path: 'signin',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
    ],
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: '',
    component: SecureLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('@/app/features/profile/profile.routes').then(
            (u) => u.profile_routes
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@/app/features/dashboard/dashboard.component').then(
            (d) => d.DashboardComponent
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('@/app/features/tasks/user-tasks.component').then(
            (t) => t.UserTasksComponent
          ),
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('@/app/features/organization/org.routes').then(
            (o) => o.org_routes
          ),
      },
      {
        path: 'subscription',
        loadComponent: () =>
          import('@/app/features/subscription/sub.component').then(
            (s) => s.SubscriptionComponent
          ),
      },
    ],
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
