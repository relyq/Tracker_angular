import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Project } from 'src/app/core/models/project';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { keydown } from 'src/app/shared/components/globals';

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
    authorId: ''
  };
  projectOld?: Project;
  keydown: Function = keydown;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[1].path === 'edit') {
      this.edit = true;
      this.getProject();
      this.projectOld = this.project;
    }
    console.log(this.edit);
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    this.projectService
      .getProject(id)
      .subscribe((project) => (this.project = project));
  }

  onSubmit = () => {
    console.log('project submitted');
    this.edit ? this.editProject() : this.createProject();
  };

  createProject(): void {
    this.project.authorId =
      this.authService.getInfo()[this.authService.userIdClaim];

    this.projectService.postProject(this.project).subscribe(() => {
      this.goBack();
    });
  }

  editProject(): void {
    this.projectService.putProject(this.project).subscribe(() => {
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
