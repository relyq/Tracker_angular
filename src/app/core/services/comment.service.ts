import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = baseUrl + '/api/comments';
  private ticketsUrl = baseUrl + '/api/tickets';

  constructor(private http: HttpClient) {}

  getComments(ticketId: number): Observable<Comment[]> {
    const comments = this.http.get<Comment[]>(
      this.ticketsUrl + '/' + ticketId + '/comments'
    );

    return comments;
  }
  getCommentsMock(): Observable<Comment[]> {
    const comments = this.http.get<Comment[]>(this.commentsUrl);

    return comments;
  }

  getComment(id: number): Observable<Comment> {
    const comment = this.http.get<Comment>(this.commentsUrl + '/' + id);
    return comment;
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment);
  }

  putComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.commentsUrl + '/' + comment.id, comment);
  }

  patchComment(comment: Comment): void {}

  deleteComment(id: number): void {
    this.http.delete(this.commentsUrl + '/' + id).subscribe();
  }
}
