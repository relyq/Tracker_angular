import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../core/services/comment.service';
import { Comment } from '../core/models/comment';
import { Observable, take } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];
  comment: Comment = {
    id: 0,
    ticketId: Number(this.route.snapshot.paramMap.get('ticketid')),
    authorId: 'ac5b0b5f-fb48-4cee-b479-b8baf62e8922',
    content: '',
    created: new Date()
  };
  users!: User[];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getComments().subscribe((comments) => {
      this.comments = comments.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      this.getUsers();
    });
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getUsername(id: string): string {
    return this.users.find((u) => u.id === id)?.username as string;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((u) => {
      this.users = u;
    });
  }

  getComments(): Observable<Comment[]> {
    const ticketId = Number(this.route.snapshot.paramMap.get('ticketid'));
    return this.commentService.getComments(ticketId);
  }

  addComment(): void {
    if (this.comment.content) {
      this.comment.created = new Date();
      this.commentService.postComment(this.comment).subscribe(() => {
        this.ngOnInit();
      });
    }
    this.comment.content = '';
  }
}
