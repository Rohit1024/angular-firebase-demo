import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'user-404',
  imports: [FontAwesomeModule],
  template: ` <div className="h-4/5 bg-base-200">
    <div className="text-accent text-center">
      <div className="max-w-md">
        <fa-icon [icon]="faSad" size="2xl" />
        <h1 className="text-5xl  font-bold">404 - Not Found</h1>
      </div>
    </div>
  </div>`,
})
export class NotFoundComponent {
  faSad = faFaceFrownOpen;
}
