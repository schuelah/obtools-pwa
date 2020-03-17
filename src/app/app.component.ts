import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Obstetrical Tools from University of Cincinnati';
  readonly user: Observable<User>;

  constructor(private auth: AuthService) {
    this.user = auth.user;
  }

  logOut() {
    this.auth.logout();
  }
}
