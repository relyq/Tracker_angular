import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin: boolean = false;
  user!: User;
  users!: User[];
  filteredUsers!: User[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isRole('Administrator');
    this.getUsers();
    this.userService
      .getUser('ac5b0b5f-fb48-4cee-b479-b8baf62e8922')
      .subscribe((u) => {
        this.user = u;
      });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  displayFn(user: User) {
    return user?.username as string;
  }

  filter(username: string): void {
    if (typeof username == 'string') {
      const filterUsername = username.toLowerCase();

      this.filteredUsers = this.users.filter((u) =>
        u.username.toLowerCase().includes(filterUsername)
      );
    }
  }
}
