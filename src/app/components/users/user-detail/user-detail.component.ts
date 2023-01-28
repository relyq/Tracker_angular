import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { Observable } from 'rxjs';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;
  roles: string[] = [];
  userOrganizations: Organization[] = [];
  path: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private roleService: RoleService,
    private Modal: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      // if path is tracker
      // i should instead check if user is logged in the tracker org
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.isAdmin = this.authService.isRole('Administrator');
    this.getUser().subscribe((res) => {
      this.user = res;

      // works for now as global roles are fixed
      // must change once custom roles are added
      this.roleService.getRoles().subscribe((res) => {
        this.user.roles.forEach((role) => {
          if (role.organizationId == this.authService.getOrganization()) {
            this.roles.push(
              res.find((r) => r.id == role.roleId)?.name as string
            );
          }
        });
      });

      if (this.path === 'tracker') {
        this.getUserOrganizations();
      }
    });
  }

  getUser(): Observable<User> {
    return this.userService.getUser(
      this.route.snapshot.paramMap.get('userid') as string
    );
  }

  getUserOrganizations(): void {
    this.user.organizationsId.forEach((org) => {
      this.organizationService.getOrganization(org).subscribe((res) => {
        this.userOrganizations.push(res);
      });
    });
  }

  deleteUser(): void {
    this.Modal.open(DeleteModalComponent, { width: '250px' })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.user.id) {
          this.userService.deleteUser(this.user.id).subscribe(() => {
            this.goBack();
          });
        }
      });
  }

  removeUser(): void {
    this.Modal.open(DeleteModalComponent, { width: '250px' })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.user.id) {
          this.organizationService
            .removeUser(this.authService.getOrganization(), this.user.email)
            .subscribe((res) => {
              this.goBack();
            });
        }
      });
  }

  goBack(): void {
    if (this.path === 'tracker') {
      this.router.navigate(['/tracker/user']);
      return;
    }
    this.router.navigate(['/admin/user']);
  }
}
