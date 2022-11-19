import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { OrganizationService } from 'src/app/core/services/organization.service';
import { RoleService } from 'src/app/core/services/role.service';
import { keydown } from 'src/app/shared/components/globals';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  isAdmin: boolean = false;
  userNew: {
    email: string;
    password: string;
    passwordConfirm: string;
  } = {
    email: '',
    password: '',
    passwordConfirm: ''
  };
  path: string = '';
  keydown: Function = keydown;

  created: boolean = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.pathFromRoot[1].url[0] != undefined) {
      this.path = this.route.snapshot.pathFromRoot[1].url[0].path;
    }

    this.isAdmin = this.authService.isRole('Administrator');
  }

  createUser = () => {
    if (
      this.userNew.email &&
      this.userNew.password &&
      this.userNew.password === this.userNew.passwordConfirm
    ) {
      this.userService.postUser(this.userNew).subscribe({
        next: (res) => {
          this.created = true;
        },
        error: (err) => {}
      });
    }
  };

  goBack(): void {
    let backRoute = this.path === 'tracker' ? '/tracker/user' : '/admin/user';
    this.router.navigateByUrl(backRoute);
  }
}
