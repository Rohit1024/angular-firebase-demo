import { AuthService } from '@/app/services/auth.service';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, faCircleCheck, faG } from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'user-auth',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div class="card bg-base-200 shadow-xl w-full -mt-6">
      <div class="card-body">
        <h2 class="card-title">Authentication</h2>
        <p>Manage your connected accounts</p>
        <div class="divider my-0"></div>
        <div class="w-full">
          <div>
            <h2 class="card-title">Connected Accounts</h2>
            <p>These are the accounts linked to your profile</p>
          </div>
          @for (provider of providers(); track $index) { @if(provider ===
          "password"){
          <ol class="space-x-6 my-6">
            <fa-icon [icon]="faEmail" size="lg" />
            <span>
              <fa-icon [icon]="faCheck" size="lg" class="text-green-500" />
              <span class="ml-2">Connected with Password</span>
            </span>
          </ol>
          } @else if(provider === "google.com"){
          <ol class="space-x-6 my-6">
            <fa-icon [icon]="faGoogle" size="lg" />
            <span>
              <fa-icon [icon]="faCheck" size="lg" class="text-green-500" />
              <span class="ml-2">Connected with Google.com</span>
            </span>
          </ol>
          }}
        </div>
        <div class="divider my-0"></div>
        <div class="w-full">
          <div>
            <h2 class="card-title">Available Providers</h2>
            <p>
              Click on the providers below to link your profile to the provider
            </p>
          </div>
          @if(!providers()!.includes("google.com")){
          <ol class="space-x-6 mt-4">
            <button class="btn btn-outline w-full">
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span class="ml-2">Connect with Google.com</span>
            </button>
          </ol>
          } @else if (!providers()!.includes("password")) {
          <ol class="space-x-6 mt-4">
            <button class="btn btn-outline w-full">
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/502648/email.svg"
                loading="lazy"
                alt="email logo"
              />
              <span class="ml-2">Connect with Email Provider</span>
            </button>
          </ol>
          }
        </div>
      </div>
    </div>
  `,
})
export class UserAuthComponent implements OnInit {
  faEmail = faAt;
  faCheck = faCircleCheck;
  faGoogle = faG;

  providers = signal<String[] | null>(null);
  authService = inject(AuthService);
  toast = inject(HotToastService);

  getProviders() {
    this.authService.currentUser$.subscribe((userDtail) => {
      if (userDtail) {
        const userInfo = userDtail.providerData;
        let provders = [];
        for (let providerId of userInfo) {
          provders.push(providerId.providerId);
        }
        this.providers.set(provders);
      }
    });
  }

  ngOnInit(): void {
    this.getProviders();
  }
}
