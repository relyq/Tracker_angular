import { Component, OnInit } from '@angular/core';
import { Project } from '../core/models/project';
import { Ticket } from '../core/models/ticket';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TicketService } from '../core/services/ticket.service';
import { ProjectService } from '../core/services/project.service';
import { Observable } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getProject().subscribe((project) => {
      this.project = project;
      this.getTickets();
    });
  }

  getProject(): Observable<Project> {
    const id = Number(this.route.snapshot.paramMap.get('projectid'));
    return this.projectService.getProject(id);
  }

  getTickets(): void {
    this.ticketService.getTickets(this.project.id).subscribe((tickets) => {
      this.ticketsAll = tickets;
      this.ticketsAll.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      this.tickets = this.ticketsAll.filter(
        (ticket) => ticket.status === 'Open'
      );
    });
  }

  showAll(): void {
    this.tickets = this.ticketsAll;
    this.closed = true;
  }

  showOpen(): void {
    this.tickets = this.ticketsAll?.filter(
      (ticket) => ticket.status === 'Open'
    );
    this.closed = false;
  }

  showClosed(): void {
    this.tickets = this.ticketsAll?.filter(
      (ticket) => ticket.status === 'Closed'
    );
    this.closed = true;
  }

  goBack(): void {
    this.location.back();
  }
}
