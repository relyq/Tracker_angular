import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/core/services/comment.service';
import { Comment } from 'src/app/core/models/comment';
import { Observable, take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { keydown, urlify } from 'src/app/shared/components/globals';

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
    authorId: '',
    content: ''
  };
  users!: User[];
  keydown: Function = keydown;
  urlify: Function = urlify;

  isAdmin: boolean = false;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.authService.isRole('Administrator')) {
      this.isAdmin = true;
    }

    this.getComments().subscribe((comments) => {
      this.comments = comments.sort(
        (a, b) =>
          new Date(b.created as Date).getTime() -
          new Date(a.created as Date).getTime()
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
    this.userService
      .getUsers(this.authService.getOrganization())
      .subscribe((res) => {
        this.users = res.users;
      });
  }

  getComments(): Observable<Comment[]> {
    const ticketId = Number(this.route.snapshot.paramMap.get('ticketid'));
    return this.commentService.getComments(ticketId);
  }

  addComment = () => {
    if (this.comment.content) {
      this.comment.authorId =
        this.authService.getInfo()[this.authService.userIdClaim];

      this.commentService.postComment(this.comment).subscribe(() => {
        this.ngOnInit();
      });
    }
    this.comment.content = '';
  };

  deleteComment(comment: Comment): void {
    this.commentService.deleteComment(comment.id);
    const index = this.comments.indexOf(comment, 0);
    if (index > -1) {
      this.comments.splice(index, 1);
    }
  }
}
