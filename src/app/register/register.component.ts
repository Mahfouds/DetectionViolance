import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new User();
  notif = 0;
  confirmPassword = '';
  passwordMismatch = false;

  constructor(private Route: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.notif = 0;
    this.user = new User();
    this.confirmPassword = '';
    this.passwordMismatch = false;
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.user.pass !== this.confirmPassword;
  }

  register() {
    console.log("user", this.user)
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.notif = 1;
        console.log(res)
      },
      error: (err) => {
        this.notif = 2;
        console.log("err", err)
      }
    })
    this.ngOnInit()
  }




}
