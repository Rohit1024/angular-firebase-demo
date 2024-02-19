import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  template: `
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <aside class="items-center grid-flow-col">
        <fa-icon [icon]="faFire" size="lg" />
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <nav
        class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"
      ></nav>
    </footer>
  `,
})
export class FooterComponent {
  faFire = faFire;
}
