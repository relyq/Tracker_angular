import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
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
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'username',
    'email',
    'firstName',
    'lastName',
    'created'
  ];

  filterString?: string;
  sort?: string;

  pageSize: number = 25;
  totalRows!: number;

  hideName: boolean = false;
  hideEmail: boolean = false;

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

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
      this.getAllUsers(
        this.pageSize,
        0,
        this.filterString,
        this.sort
      ).subscribe(() => {
        this.dataSource.paginator = this.paginator;
      });

      return;
    }

    this.getUsers(this.pageSize, 0, this.filterString, this.sort).subscribe(
      () => {
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngAfterViewInit(): void {}

  getUsers(
    limit: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): Observable<any> {
    this.dataSource.data = [];

    this.userService
      .getUsers(
        this.authService.getOrganization(),
        false,
        limit,
        offset,
        filter,
        sort
      )
      .subscribe((res) => {
        this.totalRows = res.count;
        this.users = res.users;

        this.users = this.users.filter((u) => {
          return (
            u.id != this.authService.deletedUser &&
            u.id != this.authService.unassignedUser
          );
        });

        this.dataSource.data = this.users;
      });

    return EMPTY;
  }

  getAllUsers(
    limit: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): Observable<any> {
    this.dataSource.data = [];

    this.userService
      .getUsers('', true, limit, offset, filter, sort)
      .subscribe((res) => {
        this.totalRows = res.count;
        this.users = res.users;

        this.dataSource.data = this.users;
      });

    return EMPTY;
  }

  getOrganizationUsers(organization: string): void {
    this.organizationService
      .getOrganizationUsers(organization)
      .subscribe((res) => {
        this.users = res;
      });
  }

  getDetailsUrl(id: string): string {
    if (this.path === 'tracker') {
      return '/tracker/user/' + id;
    }
    return '/admin/user/' + id;
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;

    if (
      this.path === 'tracker' &&
      this.authService.isRole('Administrator') &&
      this.authService.inOrganization(this.authService.trackerOrg)
    ) {
      this.getAllUsers(
        this.pageSize,
        event.pageIndex * event.pageSize,
        this.filterString,
        this.sort
      );

      return;
    }

    this.getUsers(
      this.pageSize,
      event.pageIndex * event.pageSize,
      this.filterString,
      this.sort
    );
  }

  customSort(e: any) {
    this.sort = e.active + '.' + e.direction;
    this.paginator.firstPage();

    if (
      this.path === 'tracker' &&
      this.authService.isRole('Administrator') &&
      this.authService.inOrganization(this.authService.trackerOrg)
    ) {
      this.getAllUsers(this.pageSize, 0, this.filterString, this.sort);

      return;
    }

    this.getUsers(this.pageSize, 0, this.filterString, this.sort);
  }

  filter(e: Event): void {
    this.filterString = (e.target as HTMLInputElement).value;

    if (
      this.path === 'tracker' &&
      this.authService.isRole('Administrator') &&
      this.authService.inOrganization(this.authService.trackerOrg)
    ) {
      this.getAllUsers(this.pageSize, 0, this.filterString, this.sort);

      return;
    }

    this.getUsers(this.pageSize, 0, this.filterString, this.sort);
  }
}
