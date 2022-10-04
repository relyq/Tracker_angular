import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../../../core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../../shared/components/modals/delete-modal/delete-modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  authorUsername!: string;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private authService: AuthService,
    private userService: UserService,
    public Modal: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.isAdmin = this.authService.isRole('Administrator');
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    this.projectService.getProject(id).subscribe((project) => {
      this.project = project;
      this.userService.getUser(this.project.authorId).subscribe((res) => {
        this.authorUsername = res.username;
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/project/']);
  }

  deleteProject(): void {
    this.Modal.open(DeleteModalComponent, {
      width: '250px'
    })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.project.id) {
          this.projectService.deleteProject(this.project.id).subscribe(() => {
            this.goBack();
          });
        }
      });
  }
}
