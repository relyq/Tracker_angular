import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from 'src/app/core/models/project';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { searchFilter } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isAdmin: boolean = false;
  dataSource = new MatTableDataSource<Project>();
  displayedColumns: string[] = ['name', 'description', 'created'];

  hideDescription: boolean = false;
  hideCreated: boolean = false;

  sort?: string;
  filterString?: string;

  pageSize: number = 10;
  totalRows!: number;

  // only show pagination if there are over x results
  paginationEnabled: boolean = false;
  readonly paginationRows: number = 10;

  filter: Function = searchFilter;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe((res) => {
      this.hideDescription = false;
      if (res.matches) {
        this.hideDescription = true;
      }
    });
    this.getProjects(this.pageSize);
    this.isAdmin = this.authService.isRole('Administrator');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getProjects(
    limit: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): void {
    this.dataSource.data = [];

    this.projectService
      .getProjects(limit, offset, filter, sort)
      .subscribe((res) => {
        this.projects = res.projects;
        this.totalRows = res.count;

        if (this.totalRows > this.paginationRows) {
          this.paginationEnabled = true;
        }

        this.projects.sort(
          (a, b) =>
            new Date(b.created as Date).getTime() -
            new Date(a.created as Date).getTime()
        );

        this.dataSource.data = this.projects;
      });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.getProjects(
      this.pageSize,
      event.pageIndex * event.pageSize,
      this.filterString,
      this.sort
    );
  }

  customSort(e: any) {
    if (this.paginationEnabled) {
      this.sort = e.active + '.' + e.direction;
      this.paginator.firstPage();
      this.getProjects(this.pageSize, 0, this.filterString, this.sort);
    }
  }

  filterAPI(e: Event): void {
    this.filterString = (e.target as HTMLInputElement).value;
    this.getProjects(this.pageSize, 0, this.filterString, this.sort);
  }
}
