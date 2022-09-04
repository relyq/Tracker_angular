import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from '../core/models/ticket';
import { TicketService } from '../core/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  edit: boolean = false;
  ticket: Ticket = {
    id: 0,
    projectId: parseInt(this.route.snapshot.url[1].path),
    title: '',
    description: '',
    priority: 1,
    type: 'issue',
    status: 'open',
    assigneeId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
    submitterId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
    created: new Date()
  };
  ticketOld?: Ticket;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[3].path === 'edit') {
      this.edit = true;
      this.getTicket();
      this.ticketOld = this.ticket;
    }
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('ticketid'));
    this.ticketService
      .getTicket(id)
      .subscribe((ticket) => (this.ticket = ticket));
  }

  onSubmit(): void {
    this.edit ? this.editTicket(this.ticket) : this.createTicket(this.ticket);
    this.goBack();
  }

  createTicket(newTicket: Ticket): void {
    let createdTicket: Ticket;
    this.ticketService.postTicket(newTicket).subscribe((t) => {
      createdTicket = t;
    });
  }

  editTicket(ticket: Ticket): void {
    this.ticketService.putTicket(ticket).subscribe();
  }

  goBack(): void {
    let backRoute: string = this.edit
      ? '/project/' + this.ticket.projectId + '/ticket/' + this.ticket.id
      : '/project/' + this.ticket.projectId + '/ticket/';
    this.router.navigate([backRoute]);
  }
}
