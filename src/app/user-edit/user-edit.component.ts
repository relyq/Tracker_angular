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
  edit: boolean = false;
  user: User = { id: '', username: '', email: '', created: new Date() };
  userNew: { email: string; password: string; passwordConfirm: string } = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isRole('Administrator');
    if (this.route.snapshot.url[1].path === 'edit') {
      this.edit = true;
    }
  }

  createUser(): void {
    if (
      this.userNew.email &&
      this.userNew.password &&
      this.userNew.password === this.userNew.passwordConfirm
    ) {
      this.userService.postUser(this.userNew).subscribe((u) => {
        console.log(u);
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/admin');
  }
}
