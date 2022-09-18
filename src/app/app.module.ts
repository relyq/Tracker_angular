import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';

import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { DeleteModalComponent } from './core/modals/delete-modal/delete-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    TicketsComponent,
    TicketDetailComponent,
    ProjectEditComponent,
    TicketEditComponent,
    DeleteModalComponent,
    CommentsComponent,
    LoginComponent,
    AppLayoutComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /*
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    */
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
