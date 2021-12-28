import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { ToDo, InquiryCategory } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-inquiry',
  templateUrl: './add-inquiry.component.html',
  styleUrls: ['./add-inquiry.component.css']
})

export class AddInquiryComponent implements OnInit {
  inquiryForm!: FormGroup;
  selectedValue: string = '';
  currentuser: User = {};
  todocategories: InquiryCategory[] = [
    {"category_id": 1, "category_name": "Сантехника"},
    {"category_id": 2, "category_name": "Электрика"},
    {"category_id": 3, "category_name": "Ремонтные работы"},
    {"category_id": 4, "category_name": "Лифт"},
    {"category_id": 5, "category_name": "Общедомовая территория"}
  ];

  todo: ToDo = { }

  submitted = false;

  constructor(private inquiryService: InquiryService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {    
    this.currentuser = this.tokenStorage.getUser();
    //this.retrieveCurrentUser;
    this.inquiryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
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

  saveInquiry(): void {
    const data = {
      inquiry_title: this.inquiryForm.value.title,
      inquiry_text: this.inquiryForm.value.text,
      todo_category: this.inquiryForm.value.category
    };
    this.inquiryService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}