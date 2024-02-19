import { AuthService } from '@/app/services/auth.service';
import { Component, inject, input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRightFromBracket,
  faUser,
  faDashboard,
  faTasks,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'user-nav',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  template: `
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="User Profile Image"
            width="10"
            height="10"
            [src]="user().photoURL ?? 'assets/avatar.png'"
          />
        </div>
      </div>
      <ul
        tabindex="5"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64"
      >
        <li>
          <a
            class="flex"
            title="View profile"
            routerLink="/user/profile"
            routerLinkActive="active"
          >
            <img
              alt="Profile"
              [src]="user().photoURL ?? 'assets/avatar.png'"
              class="w-8 rounded-full"
            />

            <div class="flex flex-col">
              <h3 class="font-bold">{{ user().displayName ?? 'Hi User' }}</h3>
              <span class="text-xs">{{ user().email }}</span>
            </div>
          </a>
        </li>
        <div class="divider my-0"></div>
        <li>
          <a
            routerLink="/user"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faDash" />
            <span class="ml-2">Dashboard</span>
          </a>
        </li>
        <li>
          <a
            routerLink="/user/tasks"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <fa-icon [icon]="faTasks" />
            <span class="ml-2">Tasks</span>
          </a>
        </li>
        <div class="divider my-0"></div>
        <li>
          <a routerLink="/org" routerLinkActive="active">
            <fa-icon [icon]="faOrg" />
            <span class="ml-2">Organization</span>
          </a>
        </li>
        <div class="divider my-0"></div>
        <li>
          <a (click)="logout()">
            <fa-icon [icon]="faLogout" />
            <span class="ml-2">Sign out</span>
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class UserNavComponent {
  user = input.required<User>();
  router = inject(Router);
  authService = inject(AuthService);
  toast = inject(HotToastService);

  //Icons
  faLogout = faRightFromBracket;
  faUser = faUser;
  faDash = faDashboard;
  faTasks = faTasks;
  faOrg = faBuilding;

  logout() {
    this.authService
      .logout()
      .pipe(
        this.toast.observe({
          success: 'Logged out Successfully',
          loading: 'Loading...',
          error: 'Something went Wrong',
        })
      )
      .subscribe({
        next: () => this.router.navigate(['/signin']),
        error: console.log,
      });
  }
}
