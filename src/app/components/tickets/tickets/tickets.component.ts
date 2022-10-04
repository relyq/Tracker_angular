import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { Ticket } from 'src/app/core/models/ticket';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketService } from 'src/app/core/services/ticket.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  project!: Project;
  tickets: Ticket[] | undefined;
  ticketsAll: Ticket[] | undefined;
  closed: boolean = false;
  users!: User[];
  canCreate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject().subscribe((project) => {
      this.project = project;
      this.getTickets();
      this.getUsers();
      this.canCreate =
        this.authService.isRole('Administrator') ||
        this.authService.isRole('Developer');
    });
  }

  getUsername(id: string): string {
    return this.users.find((u) => u.id === id)?.username as string;
  }

  getProject(): Observable<Project> {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    return this.projectService.getProject(id);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((u) => {
      this.users = u;
    });
  }

  getTickets(): void {
    this.ticketService.getTickets(this.project.id).subscribe((tickets) => {
      this.ticketsAll = tickets;
      this.ticketsAll.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
      this.tickets = this.ticketsAll.filter(
        (ticket) => ticket.status === 'open'
      );
    });
  }

  showAll(): void {
    if (this.ticketsAll) {
      this.tickets = this.ticketsAll.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
    }

    this.closed = true;
  }

  showOpen(): void {
    this.tickets = this.ticketsAll
      ?.filter((ticket) => ticket.status === 'open')
      .sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
      );
    this.closed = false;
  }

  showClosed(): void {
    this.tickets = this.ticketsAll
      ?.filter((ticket) => ticket.status === 'closed')
      .sort(
        (a, b) =>
          new Date(b.closed as Date).getTime() -
          new Date(a.closed as Date).getTime()
      );

    this.closed = true;
  }

  goBack(): void {
    this.router.navigate(['/project/' + this.project.id]);
  }
}
