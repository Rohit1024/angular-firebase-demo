import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faKey,
  faLock,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { InputErrorsComponent } from '@/app/components/input-errors.component';

@Component({
  selector: 'user-profile-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
    InputErrorsComponent,
  ],
  template: `
    <div class="card bg-base-200 shadow-xl w-full m-10 p-0">
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
                  class="inline-flex tems-center px-4 py-3 w-full"
                  routerLink="/user/profile"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  <fa-icon [icon]="faUser" size="lg" />
                  <span class="ml-2">My Details</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/user/profile/authentication"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 py-3 w-full"
                >
                  <fa-icon [icon]="faAuth" size="lg" />
                  <span class="ml-2">Authentication</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/user/profile/email"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 py-3 w-full"
                >
                  <fa-icon [icon]="faEmail" size="lg" />
                  <span class="ml-2">Email</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/user/profile/password"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 py-3 w-full"
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
