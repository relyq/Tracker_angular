import { Component, OnInit } from '@angular/core';
import { Project } from '../core/models/project';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  edit: boolean = false;
  project: Project = { id: 0, name: '', description: '' };
  projectOld?: Project;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[1].path === 'edit') {
      this.edit = true;
      this.getProject();
      this.projectOld = this.project;
    }
  }

  onSubmit(project: Project): void {
    console.log(project);
    if (this.edit) {
      this.editProject(project);
      return;
    }
    this.createProject(project);
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    this.projectService
      .getProject(id)
      .subscribe((project) => (this.project = project));
  }

  createProject(newProject: Project): void {
    let createdProject: Project;
    createdProject = this.projectService.postProject(newProject);
    // assuming project will be created successfully
    // this doesnt work
    //console.log('/project/' + createdProject.id);
    //this.router.navigate(['/project/' + createdProject.id]);

    this.goBack();
  }

  editProject(project: Project): void {
    this.projectService.patchProject(project);
  }

  goBack(): void {
    this.location.back();
  }
}
