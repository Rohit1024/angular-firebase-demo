import { Component } from '@angular/core';

@Component({
  selector: 'org-manage',
  standalone: true,
  imports: [],
  template: `
    <div class="card bg-base-200 shadow-xl w-full -mt-6">
      <div class="card-body">
        <div>
          <h2 class="card-title mt-3">General</h2>
          <p>Manage your Organization</p>
        </div>
        <div class="divider my-0"></div>
      </div>
    </div>
  `,
})
export class ManageOrgComponent {}
