import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';
import { ThemType, ThemeService, allThemes } from '../services/theme.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPalette, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ThemeChipComponent } from '../components/theme-chip.component';
import { SigninTitlesComponent } from './micro-components/signin-titles.component';
import { UserNavComponent } from './micro-components/user-nav.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    ThemeChipComponent,
    SigninTitlesComponent,
    UserNavComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a
          class="btn btn-ghost text-xl"
          routerLink="/home"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Angular Firebase Demo</a
        >
      </div>
      <div class="navbar-center"></div>
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
        <user-nav [user]="user" />
        } @else {
        <micro-tiles />
        }
      </div>
    </div>
  `,
})
export class NavbarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  themes = allThemes;
  user$ = this.authService.currentUser$;

  //Icons
  faPalette = faPalette;
  faDown = faAngleDown;

  toggleTheme(theme: ThemType) {
    this.themeService.setTheme(theme);
  }
}
