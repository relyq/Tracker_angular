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
  project: Project = {
    id: 0,
    name: '',
    description: '',
    authorid: '',
    created: new Date()
  };
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

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    this.projectService
      .getProject(id)
      .subscribe((project) => (this.project = project));
  }

  onSubmit(project: Project): void {
    console.log(project);
    this.edit ? this.editProject(project) : this.createProject(project);
  }

  createProject(project: Project): void {
    project.authorid = 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922';
    this.projectService.postProject(project).subscribe(() => {
      this.goBack();
    });
  }

  editProject(project: Project): void {
    this.projectService.putProject(project).subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    let backRoute: string = this.edit
      ? '/project/' + this.project.id
      : '/project/';
    this.router.navigate([backRoute]);
  }
}
