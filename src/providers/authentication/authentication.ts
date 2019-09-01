import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class AuthenticationProvider {

  constructor() {
    console.log('Hello AuthenticationProvider Provider');
  }

  register(credentials): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  login(credentials): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  loginAsGuest(): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInAnonymously();
  }

  logout(): Promise<void> {
    return firebase.auth().signOut();
  }
}
