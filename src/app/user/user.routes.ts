import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout.component';
import { DashboardComponent } from './dashboard.component';
import { NotFoundComponent } from '../global/not-found.component';
import { UserTasksComponent } from './user-tasks.component';

export const user_routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'tasks',
        component: UserTasksComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@/app/user/profile/profile.routes').then(
            (r) => r.profile_routes
          ),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
