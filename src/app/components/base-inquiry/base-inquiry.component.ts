import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';

@Component({
  selector: 'app-base-inquiry',
  templateUrl: './base-inquiry.component.html',
  styleUrls: ['./base-inquiry.component.css']
})
export class BaseInquiryComponent {  
  public currentuser?: User;
  public comments: Comment[] = []
  public inquiryForm!: FormGroup;
  constructor(protected inquiryService: InquiryService) { }

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

  saveComment(id: any): void {      
    let dateTime = new Date()
    const data = {
      comment_text: this.inquiryForm.value.comment,
      inquiry: id,
      comment_creator: this.currentuser,
      comment_created_at: dateTime     
    };
    this.inquiryService.createComment(data, id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      this.comments.unshift(data);
  }
}
