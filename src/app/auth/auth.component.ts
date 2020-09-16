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
    console.log('Beginning login process');
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((u) => {
        if (u && u.user.uid === 'WJI5igNeOtdhxiCXuLdJgnE7aWJ3') {
          this.router.navigate(['/preview']);
        }
        if (u && u.user.uid === 'Ojahn9JZ8dfqYXOYLuIFqMPvewz1') {
          this.router.navigate(['/calc/elbw']);
        }
      });
  }
}
