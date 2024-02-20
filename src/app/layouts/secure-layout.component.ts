import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '@/app/global/navbar.component';
import {
  faUser,
  faBuildingColumns,
  faBorderAll,
  faTasks,
  faCreditCard,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'secure-layout',
  standalone: true,
  imports: [NgIf, RouterModule, FontAwesomeModule, NavbarComponent, AsyncPipe],
  template: ` <div class="flex">
    <aside
      class="flex flex-col h-screen sticky top-0 overflow-y-auto bg-base-200"
    >
      <div class="flex justify-between p-2">
        <!-- TODO : This will be dropdown in future choosing different org -->
        <a
          class="btn btn-ghost text-lg"
          routerLink="/organization"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <fa-icon [icon]="faOrg" size="lg" />
          Org Name
        </a>

        <a class="btn btn-ghost btn-circle text-lg">
          <fa-icon [icon]="faGear" />
        </a>
      </div>
      <div class="flex flex-col border-y border-base-300 px-6 pt-4 grow">
        <div class="flex flex-col divide-y divide-base-300">
          <ul class="menu menu-lg px-0 w-full space-y-1">
            <li>
              <a
                routerLink="/dashboard"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <fa-icon [icon]="faDash" size="lg" />
                <span class="ml-2">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                routerLink="/tasks"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <fa-icon [icon]="faTasks" size="lg" />
                <span class="ml-2">Tasks</span>
              </a>
            </li>
          </ul>
          <ul class="menu menu-lg px-0 w-full space-y-1">
            <li>
              <a routerLink="/profile" routerLinkActive="active">
                <fa-icon [icon]="faUser" size="lg" />
                <span class="ml-2">Profile</span>
              </a>
            </li>
            <li>
              <a routerLink="/organization" routerLinkActive="active">
                <fa-icon [icon]="faOrg" size="lg" />
                <span class="ml-2">Organization</span>
              </a>
            </li>
            <li>
              <a routerLink="/subscription" routerLinkActive="active">
                <fa-icon [icon]="faCard" size="lg" />
                <span class="ml-2">Subscription</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      @if(user$ | async; as user){
      <div class="flex items-center w-72 p-2">
        <a
          class="btn flex"
          routerLink="/profile"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <img
            alt="Profile"
            height="32"
            width="32"
            [src]="user.photoURL ?? 'assets/avatar.png'"
            class="w-8 h-8 rounded-full"
          />

          <h3 class="font-bold text-start">
            {{ user.displayName ?? 'Hi User' }}
          </h3>
          <button class="btn btn-error btn-sm btn-square m-0" title="Logout">
            <fa-icon [icon]="faLogout" />
          </button>
        </a>
      </div>
      }
    </aside>
    <div class="w-full">
      <app-navbar />
      <div class="p-6">
        <router-outlet />
      </div>
    </div>
  </div>`,
})
export class SecureLayoutComponent {
  authService = inject(AuthService);
  user$ = this.authService.currentUser$;

  //Icons
  faUser = faUser;
  faOrg = faBuildingColumns;
  faDash = faBorderAll;
  faTasks = faTasks;
  faCard = faCreditCard;
  faGear = faGear;
  faLogout = faRightFromBracket;

  // TODO : Use modal to promt logout here
  logOut() {}
}
