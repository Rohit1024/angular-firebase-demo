import { Injectable, inject } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  GoogleAuthProvider,
  User,
  authState,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { from, of, share } from 'rxjs';

interface ProfileUser {
  displayName: string;
  email: string;
  role: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  currentUser$ = authState(this.auth);

  login(credential: { email: string; password: string }) {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      )
    );
  }

  getCurrentUserUid() {
    return this.auth.currentUser?.uid;
  }

  register(credential: { email: string; password: string }) {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      )
    );
  }

  reauthticateUser(password: string) {
    if (!this.auth.currentUser) return of(new Error('User not Authenticated'));
    const credential = EmailAuthProvider.credential(
      this.auth.currentUser.email!,
      password
    );
    return from(
      reauthenticateWithCredential(this.auth.currentUser, credential)
    );
  }

  updateUserPassword(user: User, newPassword: string) {
    return from(updatePassword(user, newPassword));
  }

  updateUser(
    user: User,
    profileDetails: {
      displayName: string;
    }
  ) {
    return from(
      updateProfile(user, {
        ...profileDetails,
      })
    );
  }

  addUser(profileUser: ProfileUser) {
    const ref = doc(this.firestore, 'users', profileUser.uid);
    return from(setDoc(ref, profileUser));
  }

  signInWithGoogle() {
    const oAuthProvider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, oAuthProvider));
  }

  logout() {
    return from(signOut(this.auth));
  }
}
