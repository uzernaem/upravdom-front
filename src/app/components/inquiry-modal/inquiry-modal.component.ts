import { Component, Inject, Input, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { Router } from '@angular/router';
import { ToDo, Comment, ToDoStatus } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-inquiry-modal',
  templateUrl: './inquiry-modal.component.html',
  styleUrls: ['./inquiry-modal.component.css']
})

export class InquiryModalComponent implements OnInit {

  inquiryForm!: FormGroup;
  managers: User[] = [];
  currentuser?: User;
  comments: Comment[] = [];
  comment: Comment = {
    comment_text: ''
  };

  todostatuses: ToDoStatus[] = [
    {"status_id": "n", "status_name": "Новая"},
    {"status_id": "w", "status_name": "В работе"},
    {"status_id": "r", "status_name": "На проверке"},
    {"status_id": "c", "status_name": "Завершена"}
  ];

  @Input() viewMode = false;

  @Input() currentToDo: ToDo = {};

  message = '';

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private inquiryService: InquiryService,
    //private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
      this.currentuser = this.tokenStorage.getUser();
      this.inquiryForm = new FormGroup({
        assignee: new FormControl(),
        status: new FormControl(),
        comment: new FormControl('', Validators.required)
          });
      if (!this.viewMode) {
        this.message = '';        
        this.retrieveCurrentUser();
        this.getInquiry(this.data.id);
      }
    }

    getInquiry(id: number): void {
      this.inquiryService.get(id)
        .subscribe({
          next: (data) => {
            this.currentToDo = data;
            this.inquiryForm.patchValue({
              assignee: data.todo_assigned_to!.id,
              status: data.todo_status
            })
            this.comments = data.comments!.sort((a,b) => b.comment_id! - a.comment_id!);
            this.comments.forEach(a => (a.comment_created_at = new Date(a.comment_created_at!)));
            if (this.currentuser!.is_manager) {
              this.retrieveManagers();
            }
            console.log(data);
          },
          error: (e) => console.error(e)
        });     
    }

    retrieveManagers(): void {
      this.inquiryService.getUsers()
        .subscribe({
          next: (data) => {
            this.managers = data.filter(x => x.is_manager);
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
        inquiry: this.currentToDo.inquiry_id,
        comment_creator: this.currentuser,
        comment_created_at: dateTime        
      };
      this.inquiryService.createComment(data, this.currentToDo.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
        this.comments.unshift(data);
    }

    updateInquiry(status: string): void {
      let dateTime = new Date()
      if (status == "nw")
      {
        this.currentToDo.todo_assigned_to = this.currentuser!.id;
        this.currentToDo.todo_status = "w";
      }
      else
      {
        this.currentToDo.todo_assigned_to = this.inquiryForm.value.assignee;
        this.currentToDo.todo_status = status
      }
      this.currentToDo.inquiry_updated_at = dateTime;
      this.inquiryService.update(this.currentToDo.inquiry_id, this.currentToDo)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      window.location.reload(); 
    }

    deleteInquiry(): void {
      this.inquiryService.delete(this.currentToDo.inquiry_id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/inquiries']);
          },
          error: (e) => console.error(e)
        });
    }
}