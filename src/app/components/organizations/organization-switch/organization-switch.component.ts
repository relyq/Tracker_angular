import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/core/models/organization';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-organization-switch',
  templateUrl: './organization-switch.component.html',
  styleUrls: ['./organization-switch.component.scss']
})
export class OrganizationSwitchComponent implements OnInit {
  organizations: Organization[] = [];
  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser(this.authService.getInfo()[this.authService.userIdClaim])
      .subscribe((res) => {
        this.user = res;

        this.user.organizationsId.forEach((orgId) => {
          this.organizationService.getOrganization(orgId).subscribe((res) => {
            this.organizations.push(res);
          });
        });
      });
  }

  switchOrganization(organization: string): void {
    this.authService.switchOrganization(organization).subscribe((res) => {
      location.reload();
    });
  }
}
