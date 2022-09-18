import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  options = this._formBuilder.group({
    fixed: true
  });
  isAdmin: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isRole('Administrator');
  }

  goRoot(): void {
    this.router.navigateByUrl('');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }
}
