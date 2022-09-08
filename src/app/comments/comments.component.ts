import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../core/services/comment.service';
import { Comment } from '../core/models/comment';

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

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    const ticketId = Number(this.route.snapshot.paramMap.get('ticketid'));
    this.commentService.getComments(ticketId).subscribe((comments) => {
      this.comments = comments.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    });
    /*
    this.commentService.getCommentsMock().subscribe((comments) => {
      this.comments = comments.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    });
    */
  }

  addComment(): void {
    if (this.comment.content) {
      console.log(this.comment);
      this.commentService.postComment(this.comment).subscribe(() => {
        this.ngOnInit();
      });
    }
    this.comment.content = '';
  }
}
