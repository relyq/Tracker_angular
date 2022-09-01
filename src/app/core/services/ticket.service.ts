import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = 'https://localhost:7004/api/tickets';
  private projectsUrl = 'https://localhost:7004/api/projects';

  constructor(private http: HttpClient) {}

  getTickets(projectId: number): Observable<Ticket[]> {
    console.log(this.projectsUrl + '/' + projectId + '/tickets');
    const tickets = this.http.get<Ticket[]>(
      this.projectsUrl + '/' + projectId + '/tickets'
    );
    return tickets;
  }

  getTicket(id: number): Observable<Ticket> {
    const ticket = this.http.get<Ticket>(this.ticketsUrl + '/' + id);
    return ticket;
  }

  postTicket(ticket: Ticket): Ticket {
    let createdTicket!: Ticket;
    console.log(ticket);

    this.http.post<Ticket>(this.ticketsUrl, ticket).subscribe((res) => {
      createdTicket = res;
    });

    return createdTicket;
  }

  patchTicket(ticket: Ticket): void {}

  deleteTicket(id: number): void {
    this.http.delete(this.ticketsUrl + '/' + id).subscribe();
  }
}
