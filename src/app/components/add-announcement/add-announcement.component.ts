import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InquiryCategory, Announcement } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css'],  
})
export class AddAnnouncementComponent implements OnInit {
  inquiryForm!: FormGroup;  
  datePickerCtrl = new FormControl();
  selectedValue: string = '';
  currentuser: User = {};
  categories: InquiryCategory[] = [
    {"category_id": 0, "category_name": "Купля/продажа"},
    {"category_id": 1, "category_name": "Аренда"},
    {"category_id": 2, "category_name": "Ремонтные работы"},
    {"category_id": 3, "category_name": "Отключение услуг"},
    {"category_id": 4, "category_name": "Placeholder"},
    {"category_id": 5, "category_name": "Placeholder"}
  ];

  announcement: Announcement = { }

  submitted = false;

  constructor(private inquiryService: InquiryService, private tokenStorage: TokenStorageService, private dateAdapter: DateAdapter<Date>) { 
    this.datePickerCtrl.valueChanges.subscribe(x => {
      console.log('date value changed', x);
    })
  }

  ngOnInit(): void {    
    this.dateAdapter.setLocale('ru');
    this.currentuser = this.tokenStorage.getUser();
    this.inquiryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      publish: new FormControl(false)
        });
   }

  saveInquiry(): void {
    const d = new Date(this.inquiryForm.value.date)
    const data = {
      inquiry_title: this.inquiryForm.value.title,
      inquiry_text: this.inquiryForm.value.text,
      announcement_category: this.inquiryForm.value.category,
      announcement_auto_invisible_date: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString(),
      announcement_is_visible: this.inquiryForm.value.publish
    };
    this.inquiryService.createAnnouncement(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}