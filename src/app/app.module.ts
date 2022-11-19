import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';

import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { ProjectDetailComponent } from './components/projects/project-detail/project-detail.component';
import { TicketsComponent } from './components/tickets/tickets/tickets.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { TicketEditComponent } from './components/tickets/ticket-edit/ticket-edit.component';
import { DeleteModalComponent } from './shared/components/modals/delete-modal/delete-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { LoginComponent } from './components/login/login.component';
import { CommentsComponent } from './components/comments/comments.component';
import { OrganizationEditComponent } from './components/organizations/organization-edit/organization-edit.component';
import { OrganizationDetailComponent } from './components/organizations/organization-detail/organization-detail.component';
import { OrganizationsComponent } from './components/organizations/organizations/organizations.component';
import { UsersComponent } from './components/users/users/users.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { OrganizationSwitchComponent } from './components/organizations/organization-switch/organization-switch.component';
import { OrganizationUserComponent } from './components/organizations/organization-user/organization-user.component';

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
    LoginComponent,
    AppLayoutComponent,
    AccountComponent,
    AdminComponent,
    UserEditComponent,
    UserDetailComponent,
    UserCreateComponent,
    AdminLayoutComponent,
    TrackerComponent,
    CommentsComponent,
    OrganizationEditComponent,
    OrganizationDetailComponent,
    OrganizationsComponent,
    UsersComponent,
    EmailConfirmationComponent,
    PasswordResetComponent,
    OrganizationSwitchComponent,
    OrganizationUserComponent
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
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    LayoutModule
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
