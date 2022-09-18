import { Component, OnInit } from '@angular/core';
import { Project } from '../core/models/project';
import { Ticket } from '../core/models/ticket';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketService } from '../core/services/ticket.service';
import { ProjectService } from '../core/services/project.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProject().subscribe((project) => {
      this.project = project;
      this.getTickets();
      this.getUsers();
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
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      this.tickets = this.ticketsAll.filter(
        (ticket) => ticket.status === 'open'
      );
    });
  }

  showAll(): void {
    if (this.ticketsAll) {
      this.tickets = this.ticketsAll.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    }

    this.closed = true;
  }

  showOpen(): void {
    this.tickets = this.ticketsAll
      ?.filter((ticket) => ticket.status === 'open')
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
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
