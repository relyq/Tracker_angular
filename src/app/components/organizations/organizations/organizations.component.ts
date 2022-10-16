import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  filter: Function = searchFilter;

  constructor(private organizationService: OrganizationService) {}

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe((res) => {
      this.organizations = res.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
      this.dataSource.data = this.organizations;
    });
  }
}
