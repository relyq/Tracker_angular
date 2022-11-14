import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  newPassword!: string;
  newPasswordConfirm!: string;

  email!: string;
  resetToken!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') as string;
    this.resetToken = this.route.snapshot.paramMap.get('token') as string;
  }

  changePassword(): void {
    this.authService
      .resetPassword(this.email, this.resetToken, this.newPassword)
      .subscribe((res) => {
        this.router.navigateByUrl('/login');
      });
  }
}
