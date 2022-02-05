import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Poll, VoteOption } from 'src/app/models/inquiry.model';
import { User } from 'src/app/models/user.model';
import { InquiryService } from 'src/app/_services/inquiry.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {
  inquiryForm!: FormGroup;  
  datePickerCtrl = new FormControl();
  selectedValue: string = '';
  currentuser: User = {};
  poll: Poll = {};
  voteoptions_list: VoteOption[] = [];
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
      deadline: new FormControl('', Validators.required),      
      voteoption: new FormControl(''),
      preliminary_results: new FormControl(false)
        });
   }

   saveInquiry(): void {
    const d = new Date(this.inquiryForm.value.deadline)
    const data = {
      inquiry_title: this.inquiryForm.value.title,
      inquiry_text: this.inquiryForm.value.text,
      poll_deadline: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString(),
      poll_preliminary_results: this.inquiryForm.value.preliminary_results,
      vote_options: this.voteoptions_list
    };
    this.inquiryService.createPoll(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  addVoteOption(): void {
    const voteoption = {
      vote_option_text: this.inquiryForm.value.voteoption
    }
    this.voteoptions_list.push(voteoption)
  }

  removeVoteOption(voteoption: VoteOption): void {
    this.voteoptions_list.forEach((value,index)=>{
      if(value==voteoption) this.voteoptions_list.splice(index,1);
    });
  }

}
