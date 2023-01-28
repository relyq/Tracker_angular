import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { keydown } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss']
})
export class OrganizationUserComponent implements OnInit {
  isAdmin: boolean = false;
  roles!: string[];
  filteredRoles!: string[];

  userEmail!: string;
  organization!: Organization;
  role!: string;

  path: string = '';
  remove: boolean = false;

  keydown: Function = keydown;

  constructor(
    public authService: AuthService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    if (this.route.snapshot.url[2].path === 'removeuser') {
      this.remove = true;
    }

    this.isAdmin = this.authService.isRole('Administrator');

    this.getRoles().subscribe((res) => {
      res.forEach((r) => {
        this.roles.push(r.name);
      });

      this.getOrganization(
        this.route.snapshot.paramMap.get('organizationid') as string
      );
    });
  }

  addUser(): void {
    this.organizationService
      .addUser(this.organization.id, this.userEmail, this.role)
      .subscribe((res) => {
        this.goBack();
      });
  }

  removeUser(): void {
    this.organizationService
      .removeUser(this.organization.id, this.userEmail)
      .subscribe((res) => {
        this.goBack();
      });
  }

  getRoles(): Observable<Role[]> {
    return this.roleService.getRoles();
  }

  getOrganization(id: string): void {
    this.organizationService.getOrganization(id).subscribe((res) => {
      this.organization = res;
    });
  }

  goBack(): void {
    let backRoute =
      this.path === 'tracker'
        ? '/tracker/organization/' + this.organization.id
        : '/admin/';
    this.router.navigateByUrl(backRoute);
  }
}
