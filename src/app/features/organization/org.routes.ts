import { Routes } from '@angular/router';
import { OrgLayoutComponent } from './org-layout.component';
import { ManageOrgComponent } from './general.component';
import { MembersComponent } from './invite-member.component';
import { ManageInvitesComponent } from './invites.component';

export const org_routes: Routes = [
  {
    path: '',
    component: OrgLayoutComponent,
    children: [
      {
        path: '',
        component: ManageOrgComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: 'invites',
        component: ManageInvitesComponent,
      },
    ],
  },
];
