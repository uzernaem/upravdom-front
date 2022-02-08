import { Component, OnInit } from '@angular/core';
import { ToDo, InquiryCategory } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { MatDialog } from '@angular/material/dialog';
import { InquiryModalComponent } from '../todo-modal/todo-modal.component';
import { AddInquiryComponent } from '../add-todo/add-todo.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { serverUrl } from 'src/app/_services/baseurl';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})

export class ToDosListComponent implements OnInit {

  todos?: ToDo[];
  listedtodos?: ToDo[];
  categories: InquiryCategory[] = [];
  search_title = '';

  filters!: FormGroup;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  statusFilter: string[] = [];
  categoryFilter: string[] = [];
  priorityFilter: string[] = [];

  constructor(private inquiryService: InquiryService, public dialog: MatDialog, fb: FormBuilder) { 
    this.filters = fb.group({
      new: true,
      worked: true,
      revision: true,
      completed: false,
      category1: true,
      category2: true,
      category3: true,
      category4: true,
      category5: true,
      priority0: true,
      priority1: true,
      priority2: true,
      priority3: true
    });
  }

  ngOnInit(): void {
    var s = new Date();
    var e = new Date();
    s.setDate(s.getMonth()-10);
    this.range.patchValue({start: s, end: e})
    this.statusFilter = ['n', 'w', 'r'];
    this.categoryFilter = ['1', '2', '3', '4', '5'];
    this.priorityFilter = ['0', '1', '2', '3'];
    this.retrieveInquiries();
  }

  retrieveInquiries(): void {
    this.inquiryService.getToDos()
      .subscribe({
        next: (data) => {
          this.todos = data;
          this.todos.forEach(a => (a.inquiry_created_at = new Date(a.inquiry_created_at!)))
          this.todos.forEach(a => {a.inquiry_creator!.photo_url = serverUrl.slice(0, -1) + a.inquiry_creator?.photo?.file;});
          this.applyFilters();
          console.log(data);
        },
        error: (e) => console.error(e)
      });      
  }

  setStatusFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.statusFilter.push(event.source.value);
    }
    else {
      this.statusFilter = this.statusFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  setCategoryFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.categoryFilter.push(event.source.value);
    }
    else {
      this.categoryFilter = this.categoryFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  setPriorityFilter(event: MatCheckboxChange): void{
    if(event.source.checked) {
      this.priorityFilter.push(event.source.value);
    }
    else {
      this.priorityFilter = this.priorityFilter.filter(x => x != event.source.value);
    }
    this.applyFilters();
  }

  applyFilters() {
    const s = new Date(this.range.value.start + this.range.value.start.getTimezoneOffset());    
    const e = new Date(this.range.value.end + this.range.value.end.getTimezoneOffset());
    this.listedtodos = this.todos?.filter(x => (this.statusFilter.includes(x.todo_status!))).filter(x =>
       (this.categoryFilter.includes(x.todo_category!))).filter(x => 
        (this.priorityFilter.includes(x.todo_priority!))).filter(x => ((x.inquiry_created_at! >= s) && (x.inquiry_created_at! <= e))).filter(x => (x.inquiry_title?.includes(this.search_title)));
  }

  inquiryDialog(id?: number) {
    const dialogRef = this.dialog.open(InquiryModalComponent, {
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.retrieveInquiries();
      console.log(`Dialog result: ${result}`);
    });
  }

  addInquiryDialog() {
    const dialogRef = this.dialog.open(AddInquiryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveInquiries();
      console.log(`Dialog result: ${result}`);
    });
  }
}