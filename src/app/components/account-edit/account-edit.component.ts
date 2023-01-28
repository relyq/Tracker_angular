import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { keydown } from 'src/app/shared/components/globals';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  user!: User;
  keydown: Function = keydown;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  getUser(): Observable<User> {
    return this.userService.getUser(this.authService.getId() as string);
  }

  updateAccount(): void {
    this.userService
      .putUser(this.user.id, {
        firstName: this.user.firstName,
        lastName: this.user.lastName
      })
      .subscribe((res) => {
        this.router.navigateByUrl('/account');
      });
  }
}
