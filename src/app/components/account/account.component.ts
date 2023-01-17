import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user!: User;
  claims: { [key: string]: string } = {};
  organizationName!: string;

  canSwitch: boolean = false;

  constructor(
    public authService: AuthService,
    private organizationService: OrganizationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.claims = this.authService.getInfo();

    this.userService
      .getUser(this.claims[this.authService.userIdClaim])
      .subscribe((res) => {
        this.user = res;

        this.canSwitch = this.user.organizationsId.length > 1;

        this.organizationService
          .getOrganization(this.authService.getOrganization())
          .subscribe((res) => {
            this.organizationName = res.name;
          });
      });
  }

  resetPassword(): void {
    this.userService.passwordReset().subscribe({
      next: (res) => {
        if (res.status == HttpStatusCode.Ok) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        }
      }
    });
  }
}
