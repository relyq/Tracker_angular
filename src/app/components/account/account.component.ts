import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/core/services/organization.service';
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

  constructor(
    public authService: AuthService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.claims = this.authService.getInfo();
    this.organizationService
      .getOrganization(this.authService.getOrganization())
      .subscribe((res) => {
        this.organizationName = res.name;
      });
  }
}