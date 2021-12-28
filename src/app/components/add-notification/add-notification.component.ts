import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InquiryCategory, Notification } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.css']
})
export class AddNotificationComponent implements OnInit {
  inquiryForm!: FormGroup;
  selectedValue: string = '';
  categories: InquiryCategory[] = [
    {"category_id": 0, "category_name": "Общее"},
    {"category_id": 1, "category_name": "Оплата счетов"},
    {"category_id": 2, "category_name": "Показания счётчиков"},
    {"category_id": 3, "category_name": "Placeholder"},
    {"category_id": 4, "category_name": "Placeholder"},
    {"category_id": 5, "category_name": "Placeholder"}
  ];

  notification: Notification = { };
  users: User[] = [];
  submitted = false;

  constructor(private inquiryService: InquiryService, private tokenStorage: TokenStorageService) {   }

  ngOnInit(): void {
    this.retrieveUsers();
    this.inquiryForm = new FormGroup({      
      user: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
        });
   }

  retrieveUsers(): void {
    this.inquiryService.getUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  saveInquiry(): void {
    const d = new Date(this.inquiryForm.value.date)
    const data = {
      inquiry_title: this.inquiryForm.value.title,
      inquiry_text: this.inquiryForm.value.text,
      notification_category: this.inquiryForm.value.category,
      notification_recipient: this.inquiryForm.value.user
    };
    this.inquiryService.createNotification(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}