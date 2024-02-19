import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero h-[calc(100vh-68px)] bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="assets/landing.jpg" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">Box Office News!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button routerLink="/login" class="btn btn-primary">
            Get Started
          </button>
          <button routerLink="/user" class="btn btn-primary mx-2">
            Dashboard
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LandingComponent {}
