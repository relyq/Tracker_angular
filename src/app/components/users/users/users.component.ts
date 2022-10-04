import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  path: string = '';
  organizations!: Organization[];

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.getOrganizations();

    if (
      this.path === 'tracker' &&
      this.authService.isRole('Administrator') &&
      this.authService.inOrganization(this.authService.trackerOrg)
    ) {
      this.getAllUsers();

      return;
    }

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.filter((u) => u.id != this.authService.deletedUser);
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getOrganizationUsers(organization: string): void {
    this.organizationService
      .getOrganizationUsers(organization)
      .subscribe((res) => {
        this.users = res;
      });
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe((res) => {
      this.organizations = res;
    });
  }

  getOrganizationName(id: string): string {
    return this.organizations.find((o) => o.id === id)?.name as string;
  }

  getDetailsUrl(id: string): string {
    if (this.path === 'tracker') {
      return '/tracker/user/' + id;
    }
    return '/admin/user/' + id;
  }
}
