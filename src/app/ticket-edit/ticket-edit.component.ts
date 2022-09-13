import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Ticket } from '../core/models/ticket';
import { TicketService } from '../core/services/ticket.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    private router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[3].path === 'edit') {
      this.edit = true;
      this.getTicket();
      this.ticketOld = this.ticket;
    }
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getTicket(): void {
    const id = Number(this.route.snapshot.paramMap.get('ticketid'));
    this.ticketService
      .getTicket(id)
      .subscribe((ticket) => (this.ticket = ticket));
  }

  onSubmit(): void {
    this.edit ? this.editTicket(this.ticket) : this.createTicket(this.ticket);
  }

  createTicket(newTicket: Ticket): void {
    let createdTicket: Ticket;
    this.ticketService.postTicket(newTicket).subscribe((t) => {
      createdTicket = t;
      this.goBack();
    });
  }

  editTicket(ticket: Ticket): void {
    this.ticketService.putTicket(ticket).subscribe(() => this.goBack());
  }

  goBack(): void {
    let backRoute: string = this.edit
      ? '/project/' + this.ticket.projectId + '/ticket/' + this.ticket.id
      : '/project/' + this.ticket.projectId + '/ticket/';
    this.router.navigate([backRoute]);
  }
}
