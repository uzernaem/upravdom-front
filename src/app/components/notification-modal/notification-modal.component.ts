import { Component, Inject, Input, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit { 
  currentuser?: User;

  @Input() viewMode = false;

  @Input() notification: Notification = {};

  message = '';

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private inquiryService: InquiryService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.retrieveCurrentUser();
        this.getInquiry(this.data.id);
      }
    }

    getInquiry(id: number): void {
      this.inquiryService.getNotification(id)
        .subscribe({
          next: (data) => {
            this.notification = data;
            // this.inquiryForm.patchValue({
            //   assignee: data.todo_assigned_to!.id,
            //   status: data.todo_status
            // })
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    retrieveCurrentUser(): void {
      this.inquiryService.getUser()
        .subscribe({
          next: (data) => {
            this.currentuser = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }

    updateInquiry(): void {
      this.inquiryService.updateNotification(this.notification.inquiry_id, this.notification)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      //window.location.reload(); 
    }
  }