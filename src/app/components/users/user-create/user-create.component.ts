import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { RoleService } from 'src/app/core/services/role.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  isAdmin: boolean = false;
  userNew: {
    email: string;
    password: string;
    passwordConfirm: string;
    organizationId?: string;
    role?: string;
  } = {
    email: '',
    password: '',
    passwordConfirm: '',
    role: ''
  };
  path: string = '';
  organizations!: Organization[];
  filteredOrganizations!: Organization[];
  roles!: string[];
  filteredRoles!: string[];

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.isAdmin = this.authService.isRole('Administrator');

    this.getOrganizations().subscribe((res) => {
      this.organizations = res;
      this.getRoles();
    });
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  getOrganizations(): Observable<Organization[]> {
    return this.organizationService.getOrganizations();
  }

  createUser(): void {
    if (
      this.userNew.email &&
      this.userNew.password &&
      this.userNew.password === this.userNew.passwordConfirm
    ) {
      if (this.path.includes('tracker') && !this.userNew.organizationId) {
        return;
      }

      this.userService.postUser(this.userNew).subscribe((u) => {
        this.goBack();
      });
    }
  }

  goBack(): void {
    let backRoute = this.path === 'tracker' ? '/tracker/user' : '/admin/user';
    this.router.navigateByUrl(backRoute);
  }

  displayOrganization(organizationId: string): string {
    return this.organizations.find((o) => o.id === organizationId)
      ?.name as string;
  }

  filterOrganization(organization: string): void {
    const filterOrganization = organization.toLowerCase();

    this.filteredOrganizations = this.organizations.filter((o) =>
      o.name.toLowerCase().includes(filterOrganization)
    );
  }

  displayRole(role: string): string {
    return this.roles.find((r) => r === role) as string;
  }

  filterRole(role: string): void {
    const filterRole = role.toLowerCase();

    this.filteredRoles = this.roles.filter((r) =>
      r.toLowerCase().includes(filterRole)
    );
  }
}
