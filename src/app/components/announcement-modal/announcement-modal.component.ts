import { Component, Inject, Input, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { Router } from '@angular/router';
import { Comment, Announcement } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-announcement-modal',
  templateUrl: './announcement-modal.component.html',
  styleUrls: ['./announcement-modal.component.css']
})
export class AnnouncementModalComponent implements OnInit {  
  
  inquiryForm!: FormGroup;
  currentuser?: User;
  comments: Comment[] = [];
  comment: Comment = {
    comment_text: ''
  };

  @Input() viewMode = false;

  @Input() announcement: Announcement = {};

  message = '';

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private inquiryService: InquiryService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      this.currentuser = this.tokenStorage.getUser();
      this.inquiryForm = new FormGroup({
        comment: new FormControl('', Validators.required)
          });
      if (!this.viewMode) {
        this.message = '';        
        this.retrieveCurrentUser();
        this.getInquiry(this.data.id);
      }
    }

    getInquiry(id: number): void {
      this.inquiryService.getAnnouncement(id)
        .subscribe({
          next: (data) => {
            this.announcement = data;
            // this.inquiryForm.patchValue({
            //   assignee: data.todo_assigned_to!.id,
            //   status: data.todo_status
            // })
            this.comments = data.comments!.sort((a,b) => b.comment_id! - a.comment_id!);
            this.comments.forEach(a => (a.comment_created_at = new Date(a.comment_created_at!)));
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

    saveComment(): void {      
      let dateTime = new Date()
      const data = {
        comment_text: this.inquiryForm.value.comment,
        inquiry: this.announcement.inquiry_id,
        comment_creator: this.currentuser,
        comment_created_at: dateTime     
      };
      this.inquiryService.createComment(data, this.announcement.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
        this.comments.unshift(data);
    }

    updateInquiry(publish: boolean): void {
      this.announcement.announcement_is_visible = publish;
      this.inquiryService.updateAnnouncement(this.announcement.inquiry_id, this.announcement)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      //window.location.reload(); 
    }

    deleteInquiry(): void {
      this.inquiryService.deleteAnnouncement(this.announcement.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/inquiries']);
          },
          error: (e) => console.error(e)
        });
    }
}