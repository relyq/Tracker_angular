import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/core/models/organization';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { UserService } from 'src/app/core/services/user.service';
import { searchFilter } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  path: string = '';
  organizations!: Organization[];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'username',
    'email',
    'firstName',
    'lastName',
    'created'
  ];

  hideName: boolean = false;
  hideEmail: boolean = false;

  filter: Function = searchFilter;

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.TabletPortrait])
      .subscribe((res) => {
        this.hideName = false;
        this.hideEmail = false;
        if (res.breakpoints[Breakpoints.TabletPortrait]) {
          this.hideName = true;
        }
        if (res.breakpoints[Breakpoints.XSmall]) {
          this.hideName = true;
          this.hideEmail = true;
        }
      });

    if (
      this.path === 'tracker' &&
      this.authService.isRole('Administrator') &&
      this.authService.inOrganization(this.authService.trackerOrg)
    ) {
      this.displayedColumns.splice(
        this.displayedColumns.length - 1,
        0,
        'organization'
      );

      this.getOrganizations();
      this.getAllUsers();

      return;
    }

    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res
        .filter((u) => {
          return (
            u.id != this.authService.deletedUser &&
            u.id != this.authService.unassignedUser
          );
        })
        .sort(
          (a, b) =>
            new Date(b.created as Date).getTime() -
            new Date(a.created as Date).getTime()
        );
      this.dataSource.data = this.users;
    });
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
      this.dataSource.data = this.users;
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
