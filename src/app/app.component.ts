import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tracker';

  options = this._formBuilder.group({
    fixed: true,
  });

  constructor(private _formBuilder: FormBuilder) { }
}
