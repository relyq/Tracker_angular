import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  options = this._formBuilder.group({
    fixed: true
  });

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  goRoot(): void {
    this.router.navigateByUrl('');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }
}
