import { Routes } from '@angular/router';
import { UserAuthComponent } from './auth.component';
import { UserEmailComponent } from './email.component';
import { UserPasswordComponent } from './password.component';
import { UserDetailsComponent } from './details.component';
import { UserProfileLayoutComponent } from './user-profile-layout.component';

export const profile_routes: Routes = [
  {
    path: '',
    component: UserProfileLayoutComponent,
    children: [
      {
        path: '',
        component: UserDetailsComponent,
      },
      {
        path: 'authentication',
        component: UserAuthComponent,
      },
      {
        path: 'email',
        component: UserEmailComponent,
      },
      {
        path: 'password',
        component: UserPasswordComponent,
      },
    ],
  },
];
