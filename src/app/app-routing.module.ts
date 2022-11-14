import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { ProjectDetailComponent } from './components/projects/project-detail/project-detail.component';
import { TicketsComponent } from './components/tickets/tickets/tickets.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { ProjectEditComponent } from './components/projects/project-edit/project-edit.component';
import { TicketEditComponent } from './components/tickets/ticket-edit/ticket-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { TrackerAdminGuard } from './core/guards/tracker-admin.guard';
import { OrganizationsComponent } from './components/organizations/organizations/organizations.component';
import { OrganizationDetailComponent } from './components/organizations/organization-detail/organization-detail.component';
import { UsersComponent } from './components/users/users/users.component';
import { OrganizationEditComponent } from './components/organizations/organization-edit/organization-edit.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '', canActivate: [AuthGuard] },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin/user',
        component: UsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin/user/create',
        component: UserCreateComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin/user/edit/:userid',
        component: UserEditComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin/user/:userid',
        component: UserDetailComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'project',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/create',
        component: ProjectEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/edit/:projectid',
        component: ProjectEditComponent,
        canActivate: [AuthGuard]
      },
      /*
      {
        path: 'project/:projectid',
        component: ProjectDetailComponent,
        canActivate: [AuthGuard]
      },*/
      {
        path: 'project/:projectid',
        component: TicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/create',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/edit/:ticketid',
        component: TicketEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/:projectid/ticket/:ticketid',
        component: TicketDetailComponent,
        canActivate: [AuthGuard]
      },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'tracker',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: TrackerComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'organization',
        component: OrganizationsComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'organization/create',
        component: OrganizationEditComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'organization/edit/:organizationid',
        component: OrganizationEditComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'organization/:organizationid',
        component: OrganizationDetailComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'user',
        component: UsersComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'user/create',
        component: UserCreateComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'user/edit/:userid',
        component: UserEditComponent,
        canActivate: [TrackerAdminGuard]
      },
      {
        path: 'user/:userid',
        component: UserDetailComponent,
        canActivate: [TrackerAdminGuard]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'confirm/:email/:token',
    component: EmailConfirmationComponent
  },
  {
    path: 'reset/:email/:token',
    component: PasswordResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
