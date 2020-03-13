import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  busy = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // this.busy = true;

    console.log(this.loginForm.value);

    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((u) => {
        console.log(u);

        if (u && u.user.uid === 'WJI5igNeOtdhxiCXuLdJgnE7aWJ3') {
          this.router.navigate(['/calc/cdh-calc']);
        }
      });
      // .then(u => {
      //   console.warn(u.user.uid);
      //   if (u.user.uid === 'WJI5igNeOtdhxiCXuLdJgnE7aWJ3') {
      //     this.router.navigate(['/calc/cdh-calc']);
      //   }
      // })
      // .catch(e => {
      //   console.warn(e);
      // })
      // .finally(() => {
      //   this.busy = false;
      // });
  }
}
