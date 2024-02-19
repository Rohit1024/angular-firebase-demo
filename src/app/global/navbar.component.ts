import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';
import { ThemType, ThemeService, allThemes } from '../services/theme.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPalette,
  faUser,
  faRightFromBracket,
  faBuilding,
  faTasks,
  faAngleDown,
  faDashboard,
  faBars,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeChipComponent } from '../components/theme-chip.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, FontAwesomeModule, ThemeChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a
          class="btn btn-ghost text-xl"
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Angular Firebase Demo</a
        >
      </div>
      <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1 btn-sm btn-ghost">
            <fa-icon [icon]="faPalette" size="lg" />
            <fa-icon [icon]="faDown" size="lg" />
          </div>
          <div
            tabindex="0"
            class="flex flex-col dropdown-content gap-2 mt-2 z-10 p-4 shadow-2xl bg-base-200 rounded-box w-64 h-72 overflow-y-scroll"
          >
            @for (theme of themes; track theme) {
            <a (click)="toggleTheme(theme)">
              <theme-preview-chip [theme]="theme" />
            </a>
            }
          </div>
        </div>
        @if (user$ | async; as user) {
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="User Profile Image"
                width="10"
                height="10"
                [src]="user.photoURL ?? 'assets/avatar.png'"
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
                  [src]="user.photoURL ?? 'assets/avatar.png'"
                  class="w-8 rounded-full"
                />

                <div class="flex flex-col">
                  <h3 class="font-bold">{{ user.displayName ?? 'Hi User' }}</h3>
                  <span class="text-xs">{{ user.email }}</span>
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
        } @else {
        <!-- <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal font-bold">
            <li>
              <a class="rounded-full text-black" routerLink="/signin"
                >Sign In</a
              >
            </li>
            <li>
              <a class="rounded-full text-black" routerLink="/signup"
                >Sign Up</a
              >
            </li>
          </ul>
        </div> -->
        <!-- Menu (Desktop) -->
        <div class="shrink-0 hidden md:flex gap-2">
          <a class="btn btn-sm btn-ghost" routerLink="/signup"
            >Create Account</a
          >
          <a class="btn btn-sm btn-primary" routerLink="/signin">
            Sign in
            <fa-icon [icon]="faLogin" />
          </a>
        </div>

        <!-- Menu (Mobile) -->
        <div class="dropdown dropdown-end md:hidden">
          <button class="btn btn-ghost">
            <fa-icon [icon]="faBars" size="lg" />
          </button>

          <ul
            tabindex="0"
            class="dropdown-content menu z-[1] bg-base-200 p-4 rounded-box shadow w-56 gap-2"
          >
            <li>
              <a class="btn btn-sm btn-ghost" routerLink="/signup"
                >Create Account</a
              >
            </li>
            <a class="btn btn-primary btn-sm" routerLink="/signin">
              Log in
              <fa-icon [icon]="faLogin" />
            </a>
          </ul>
        </div>
        }
      </div>
    </div>
  `,
})
export class NavbarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  toast = inject(HotToastService);
  themes = allThemes;
  user$ = this.authService.currentUser$;
  router = inject(Router);

  //Icons
  faPalette = faPalette;
  faLogout = faRightFromBracket;
  faUser = faUser;
  faDash = faDashboard;
  faTasks = faTasks;
  faOrg = faBuilding;
  faDown = faAngleDown;
  faLogin = faRightToBracket;
  faBars = faBars;

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
        error(err) {
          console.log(err);
        },
      });
  }

  toggleTheme(theme: ThemType) {
    this.themeService.setTheme(theme);
  }
}
