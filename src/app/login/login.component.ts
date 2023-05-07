import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string = '';

  constructor( private router: Router,private authService: AuthService ) { this.router.navigateByUrl("/"); }

  onSubmit() {
    this.errorMessage = '';
    this.authService.authenticateUser(this.user).subscribe({
      next: (response) => {
        this.authService.setId(response.id);
        this.authService.setToken(response.token);
        this.authService.setIsLoggedIn('true');
        this.router.navigate(['/messagerie']);
      },
      error: (err) => {
        const errorCode = err.status;
        if (errorCode === 403) {
          this.errorMessage = 'Login ou mot de passe incorrect';
          console.log('Login ou mot de passe incorrect');
        }
      },
    });
    this.ngOnInit();
  }

  ngOnInit() {

  }

}