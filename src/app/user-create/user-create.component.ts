import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  isAdmin: boolean = false;
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
