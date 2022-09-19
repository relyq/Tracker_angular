import { Component, OnInit } from '@angular/core';
import { Project } from '../core/models/project';
import { AuthService } from '../core/services/auth.service';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  isAdmin: boolean = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.isAdmin = this.authService.isRole('Administrator');
  }

  getProjects(): void {
    this.projectService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }
}
