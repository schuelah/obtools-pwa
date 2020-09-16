import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Observable} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

const approvedUsers = [
  'WJI5igNeOtdhxiCXuLdJgnE7aWJ3',
  'Ojahn9JZ8dfqYXOYLuIFqMPvewz1'
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly user: Observable<User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.user;
  }

  isUserAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.user.subscribe(user => {
        if (user && approvedUsers.includes(user.uid)) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
      });
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}
