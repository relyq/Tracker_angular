import { Component, OnInit } from '@angular/core';
import { Project } from '../core/models/project';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../core/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    public Modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    this.projectService
      .getProject(id)
      .subscribe((project) => (this.project = project));
  }

  goBack(): void {
    this.location.back();
  }

  deleteProject(): void {
    this.Modal.open(DeleteModalComponent, {
      width: '250px'
    })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.project.id) {
          this.projectService.deleteProject(this.project.id);
          this.goBack();
        }
      });
  }
}
