import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from '../core/models/ticket';
import { TicketService } from '../core/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../core/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket!: Ticket;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ticketService: TicketService,
    public Modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('ticketid'));
    this.ticketService
      .getTicket(id)
      .subscribe((ticket) => (this.ticket = ticket));
  }

  goBack(): void {
    this.location.back();
  }

  deleteTicket(): void {
    this.Modal.open(DeleteModalComponent, {
      width: '250px'
    })
      .afterClosed()
      .subscribe((res) => {
        if (res && this.ticket.id) {
          this.ticketService.deleteTicket(this.ticket.id);
          this.goBack();
        }
      });
  }
}
