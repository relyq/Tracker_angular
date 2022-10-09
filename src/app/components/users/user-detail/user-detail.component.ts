import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;
  path: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private Modal: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.isAdmin = this.authService.isRole('Administrator');
    this.getUser();
  }

  getUser(): void {
    this.userService
      .getUser(this.route.snapshot.paramMap.get('userid') as string)
      .subscribe((res) => {
        this.user = res;
      });
  }

  deleteUser(): void {
    this.Modal.open(DeleteModalComponent, { width: '250px' })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.user.id) {
          this.userService.deleteUser(this.user.id).subscribe(() => {
            this.goBack();
          });
        }
      });
  }

  goBack(): void {
    if (this.path === 'tracker') {
      this.router.navigate(['/tracker/user']);
      return;
    }
    this.router.navigate(['/admin/user']);
  }
}
