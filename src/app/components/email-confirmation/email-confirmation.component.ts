import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  emailAddress!: string;
  confirmationToken!: string;
  result!: string;
  login: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.emailAddress = this.route.snapshot.paramMap.get('email') as string;
    this.confirmationToken = this.route.snapshot.paramMap.get(
      'token'
    ) as string;

    this.authService
      .confirmEmail(this.emailAddress, this.confirmationToken)
      .subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.result = 'Your email address has been successfully confirmed.';
            this.login = true;
          }
        },
        error: (err) => {
          this.result = 'There was a problem confirming your email address.';
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
