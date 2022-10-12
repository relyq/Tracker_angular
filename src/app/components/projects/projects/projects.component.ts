import { Component, OnInit } from '@angular/core';
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

  filter: Function = searchFilter;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.isAdmin = this.authService.isRole('Administrator');
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
      this.dataSource.data = this.projects;
    });
  }
}
