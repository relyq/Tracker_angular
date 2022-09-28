import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from '../core/modals/delete-modal/delete-modal.component';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private Modal: MatDialog
  ) {}

  ngOnInit(): void {
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
    this.router.navigate(['/admin/']);
  }
}
