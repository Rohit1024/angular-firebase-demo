import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'user-profile-layout',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  template: `
    <div class="card bg-base-200 shadow-xl w-full">
      <div class="card-body">
        <div class="inline-block">
          <h2 class="card-title">Update Profile</h2>
        </div>
        <div class="divider"></div>
        <div class="flex my-0">
          <aside class="flex overflow-x-auto w-64 mr-6">
            <ul class="menu space-y-1 w-full">
              <li>
                <a
                  class="inline-flex tems-center px-4 w-full"
                  routerLink="/profile"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  <fa-icon [icon]="faUser" size="lg" />
                  <span class="ml-2">My Details</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/profile/authentication"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 w-full"
                >
                  <fa-icon [icon]="faAuth" size="lg" />
                  <span class="ml-2">Authentication</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/profile/email"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 w-full"
                >
                  <fa-icon [icon]="faEmail" size="lg" />
                  <span class="ml-2">Email</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/profile/password"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 w-full"
                >
                  <fa-icon [icon]="faPass" size="lg" />
                  <span class="ml-2">Password</span>
                </a>
              </li>
            </ul>
          </aside>
          <div class="w-full"><router-outlet /></div>
        </div>
      </div>
    </div>
  `,
})
export class UserProfileLayoutComponent {
  //Icons
  faUser = faUser;
  faAuth = faKey;
  faEmail = faEnvelope;
  faPass = faLock;
}
