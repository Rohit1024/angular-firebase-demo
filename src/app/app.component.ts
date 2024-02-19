import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './global/footer.component';
import { NavbarComponent } from './global/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, FooterComponent],
  template: `<app-navbar /> <router-outlet /><app-footer />`,
})
export class AppComponent {}
