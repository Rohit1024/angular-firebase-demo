import { Component } from '@angular/core';

@Component({
  selector: 'org-member-invite',
  standalone: true,
  imports: [],
  template: `
    <div class="card bg-base-200 shadow-xl w-full -mt-6">
      <div class="card-body">
        <div>
          <h2 class="card-title mt-3">Pending Invites</h2>
          <p>Manage invites not yet accepted</p>
        </div>
        <div class="divider my-0"></div>
      </div>
    </div>
  `,
})
export class ManageInvitesComponent {}
