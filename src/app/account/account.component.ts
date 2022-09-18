import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user!: User;
  claims: { [key: string]: string } = {};
  isAdmin: boolean = false;
  isDev: boolean = false;
  isUser: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getInfo());
    let token = this.authService.getInfo();
    this.claims[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ] =
      token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    this.claims[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ] =
      token[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    this.claims[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ] = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    this.isAdmin = this.authService.isRole('Administrator');
    this.isDev = this.authService.isRole('Developer');
    this.isUser = this.authService.isRole('User');
  }
}
