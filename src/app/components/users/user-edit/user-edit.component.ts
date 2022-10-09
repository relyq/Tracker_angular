import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { keydown } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;
  path: string = '';
  keydown: Function = keydown;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  editUser = () => {};

  goBack(): void {
    let backRoute = this.path === 'tracker' ? '/tracker/user' : '/admin/user';
    this.router.navigateByUrl(backRoute);
  }
}
