import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'micro-tiles',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  template: `
    <div class="shrink-0 hidden md:flex gap-2">
      <a class="btn btn-sm btn-ghost" routerLink="/signup">Create Account</a>
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
  `,
})
export class SigninTitlesComponent {
  faLogin = faRightToBracket;
  faBars = faBars;
}
