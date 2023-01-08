import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { searchFilter } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  dataSource = new MatTableDataSource<Organization>();
  displayedColumns: string[] = ['name', 'created'];

  sort?: string;
  filterString?: string;

  pageSize: number = 3;
  totalRows!: number;

  constructor(private organizationService: OrganizationService) {}

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getOrganizations(this.pageSize).subscribe(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  getOrganizations(
    limit: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): Observable<any> {
    this.dataSource.data = [];

    this.organizationService
      .getOrganizations(limit, offset, filter, sort)
      .subscribe((res) => {
        this.totalRows = res.count;
        this.organizations = res.organizations;

        this.organizations.sort(
          (a, b) =>
            new Date(b.created as Date).getTime() -
            new Date(a.created as Date).getTime()
        );
        this.dataSource.data = this.organizations;
      });

    return EMPTY;
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.getOrganizations(
      this.pageSize,
      event.pageIndex * event.pageSize,
      this.filterString,
      this.sort
    );
  }

  customSort(e: any) {
    this.sort = e.active + '.' + e.direction;
    this.paginator.firstPage();
    this.getOrganizations(this.pageSize, 0, this.filterString, this.sort);
  }

  filter(e: Event): void {
    this.filterString = (e.target as HTMLInputElement).value;
    this.getOrganizations(this.pageSize, 0, this.filterString, this.sort);
  }
}
