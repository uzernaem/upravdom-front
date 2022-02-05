import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DialogData } from '../announcement-modal/announcement-modal.component';
import { BaseInquiryComponent } from '../base-inquiry/base-inquiry.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poll, Vote, VoteOption } from 'src/app/models/inquiry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poll-modal',
  templateUrl: './poll-modal.component.html',
  styleUrls: ['./poll-modal.component.css']
})
export class PollModalComponent  extends BaseInquiryComponent implements OnInit {

  @Input() viewMode = false;

  @Input() poll: Poll = {};

  vote_options: VoteOption[] = [];
  vote_sum: number = 0;
  vote_enabled: boolean = true;
  message = '';

  public customOption: string = 'customOption';
  
  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    private router: Router,
    private tokenStorage: TokenStorageService,
    inquiryService: InquiryService) {
    super(inquiryService);
  }

  ngOnInit(): void {
    this.inquiryForm = new FormGroup({ });
  if (!this.viewMode) {      
    this.retrieveCurrentUser();
    this.getInquiry(this.data.id);
    }
  }

  getInquiry(id: number): void {
    this.inquiryService.getPoll(id)
      .subscribe({
        next: (data) => {
          this.poll = data;
          this.vote_options = data.vote_options!;
          this.vote_options.forEach(x => {this.vote_sum += x.votes!.length;
            x.votes?.forEach(y => { 
              if (y.voter==this.currentuser.id)
                this.vote_enabled=false;
              }
            )});
          if (this.vote_sum == 0)
            this.vote_options.forEach(x => {x.percentage = 0});
          else
            this.vote_options.forEach(x => {x.percentage = Math.round(x.votes!.length / this.vote_sum * 100)});
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  vote(id: number): void {
    if (this.vote_enabled){
      const data = {
        selected_option: id
      }
      this.inquiryService.vote(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.vote_options.find(x => x.id === id)!.votes!.push(new Vote())        
          this.vote_sum++;  
          this.vote_options.forEach(x => {x.percentage = Math.round(x.votes!.length / this.vote_sum * 100)});
          this.vote_enabled = false;
        },
        error: (e) => {
          console.error(e);
          this.message = "Вы уже проголосовали!"
        }
      });
    }
    else this.message = "Вы уже проголосовали!"
  }
}
