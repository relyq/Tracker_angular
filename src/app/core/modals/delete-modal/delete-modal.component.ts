import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  constructor(public modalRef: MatDialogRef<DeleteModalComponent>) {}

  ngOnInit(): void {}

  // clicking on background is undefined

  onConfirm(): void {
    this.modalRef.close(true);
  }

  onCancel(): void {
    this.modalRef.close(false);
  }
}
