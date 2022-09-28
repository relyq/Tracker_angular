import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  editUser(): void {}

  goBack(): void {
    this.router.navigateByUrl('/admin');
  }
}
