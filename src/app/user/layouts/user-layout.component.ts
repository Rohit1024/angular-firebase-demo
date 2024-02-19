import { AuthService } from '@/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faBuildingColumns,
  faTasks,
  faBorderAll,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dash-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FontAwesomeModule],
  template: `
    <div class="flex">
      <aside
        class="flex flex-col items-center h-screen sticky top-0 left-0 overflow-y-auto space-y-2 w-72 py-6 px-4 bg-base-200"
      >
        <ng-container *ngIf="user$ | async as user">
          <img
            alt="Profile"
            width="35"
            height="35"
            [src]="user.photoURL ?? './assets/avatar.png'"
            class="w-32 rounded-full"
          />
          <h2 class="font-bold text-lg">{{ user.displayName ?? 'Hi User' }}</h2>
          <span class="text-sm">{{ user.email }}</span>
        </ng-container>
        <div class="divider"></div>
        <ul class="menu menu-lg space-y-1 w-full">
          <li class="menu-title">Analytics</li>
          <li>
            <a
              routerLink="/user"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <fa-icon [icon]="faDash" size="lg" />
              <span class="ml-2">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              routerLink="/user/tasks"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              <fa-icon [icon]="faTasks" size="lg" />
              <span class="ml-2">Tasks</span>
            </a>
          </li>
          <li class="menu-title">Settings</li>

          <li>
            <a routerLink="/user/profile" routerLinkActive="active">
              <fa-icon [icon]="faUser" size="lg" />
              <span class="ml-2">Profile</span>
            </a>
          </li>
          <li>
            <a routerLink="/docs" routerLinkActive="active">
              <fa-icon [icon]="faOrg" size="lg" />
              <span class="ml-2">Organization</span>
            </a>
          </li>
        </ul>
      </aside>
      <div class="w-3/4"><router-outlet /></div>
    </div>
  `,
})
export class UserLayoutComponent {
  authService = inject(AuthService);
  user$ = this.authService.currentUser$;

  //Icons
  faUser = faUser;
  faOrg = faBuildingColumns;
  faDash = faBorderAll;
  faTasks = faTasks;
}
