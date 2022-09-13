import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  options = this._formBuilder.group({
    fixed: true
  });

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {}
}
