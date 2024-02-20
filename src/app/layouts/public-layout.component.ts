import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@/app/global/navbar.component';

@Component({
  selector: 'public-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar />
    <router-outlet />
  `,
})
export class PublicLayoutComponent {}
