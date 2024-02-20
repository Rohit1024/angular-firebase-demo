import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBuildingColumns,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'org-layout',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  template: `
    <div class="card bg-base-200 shadow-xl w-full">
      <div class="card-body">
        <div class="inline-block">
          <h2 class="card-title">Organization Settings</h2>
        </div>
        <div class="divider"></div>
        <div class="flex my-0">
          <aside class="flex overflow-x-auto w-64 mr-6">
            <ul class="menu space-y-1 w-full">
              <li>
                <a
                  class="inline-flex tems-center px-4 w-full"
                  routerLink="/organization"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                >
                  <fa-icon [icon]="faOrg" size="lg" />
                  <span class="ml-2">General</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/organization/members"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 w-full"
                >
                  <fa-icon [icon]="faMembers" size="lg" />
                  <span class="ml-2">Members</span>
                </a>
              </li>
              <li>
                <a
                  routerLink="/organization/invites"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="inline-flex tems-center px-4 w-full"
                >
                  <fa-icon [icon]="faInvite" size="lg" />
                  <span class="ml-2">Pending Invites</span>
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
export class OrgLayoutComponent {
  faOrg = faBuildingColumns;
  faMembers = faUsers;
  faInvite = faUserPlus;
}
