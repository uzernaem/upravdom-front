import { Component, Inject, Input, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/inquiry.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseInquiryComponent } from '../base-inquiry/base-inquiry.component';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent extends BaseInquiryComponent implements OnInit { 

  @Input() viewMode = false;

  @Input() notification: Notification = {};

  message = '';

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    inquiryService: InquiryService) {
      super(inquiryService);
    }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        //this.retrieveCurrentUser();
        this.getInquiry(this.data.id);
      }
    }

    getInquiry(id: number): void {
      this.inquiryService.getNotification(id)
        .subscribe({
          next: (data) => {
            this.notification = data;
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