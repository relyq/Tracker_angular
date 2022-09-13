import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any = { email: 'relyqx@gmail.com', password: 'mSS/P8WT-Y9SK9m' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.user.email && this.user.password) {
      console.log(this.user.email + '\n' + this.user.password);
      this.authService
        .login(this.user.email, this.user.password)
        .subscribe(() => {
          this.authService.test().subscribe();
        });
    }
  }
}
