import { ApplicationConfig, NgZone, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';
import { provideAnimations } from '@angular/platform-browser/animations';
import { config } from 'src/environment/environment';
import { provideRouter, withRouterConfig } from '@angular/router';
import { App_Routes } from './app.routes';
import { provideHotToastConfig } from '@ngneat/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHotToastConfig(),
    provideRouter(
      App_Routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(config.firebaseConfig)),
      provideAuth(() => {
        const auth = getAuth();
        if (config.dev) {
          connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
            disableWarnings: true,
          });
        }
        return auth;
      }),

      provideFirestore(() => {
        const firestore = getFirestore();
        if (config.dev) {
          connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
        }
        return firestore;
      }),

      provideFunctions(() => {
        const functions = getFunctions();
        if (config.dev) {
          connectFunctionsEmulator(functions, '127.0.0.1', 5001);
        }
        return functions;
      }),

      provideStorage(() => {
        const storage = getStorage();
        if (config.dev) {
          connectStorageEmulator(storage, '127.0.0.1', 5001);
        }
        return storage;
      }),
    ]),
  ],
};
