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
    projectId: parseInt(this.route.snapshot.url[1].path),
    title: '',
    description: '',
    priority: 1,
    type: 'issue',
    status: 'open',
    assignee: '',
    submitter: '',
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
    console.log(this.ticket);
    if (this.edit) {
      this.editTicket(this.ticket);
      return;
    }
    this.createTicket(this.ticket);
  }

  createTicket(newTicket: Ticket): void {
    let createdTicket: Ticket;
    this.ticket.assignee = 'relyqx@gmail.com';
    this.ticket.submitter = 'relyqx@gmail.com';
    createdTicket = this.ticketService.postTicket(newTicket);
    // assuming project will be created successfully
    // this doesnt work
    // console.log('/project/' + createdTicket.projectId + '/ticket/' + createdTicket.id);
    // this.router.navigate(['/project/' + createdTicket.projectId + '/ticket/' + createdTicket.id]);

    this.goBack();
  }

  editTicket(ticket: Ticket): void {
    this.ticketService.patchTicket(ticket);
  }

  goBack(): void {
    this.location.back();
  }
}
