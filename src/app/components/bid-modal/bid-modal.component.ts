import { Component, Input, OnInit } from '@angular/core';
import { BidService } from 'src/app/services/bid.service';
import { FormBuilder } from '@angular/forms';
import { Bid } from 'src/app/entities/bid';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bid-modal',
  templateUrl: './bid-modal.component.html',
  styleUrls: ['./bid-modal.component.scss']
})
export class BidModalComponent implements OnInit {

  error: string[] = [];

  bidForm = this.formBuilder.group({
    bidValue: '',
    firstName: '',
    lastName: '',
    socialName: '',
    email: '',
    check: ''
  });

  constructor(
    private bidServce: BidService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  addBid() {
    this.error = [];
    const value = this.bidForm.get('bidValue')?.value;
    const firstName = this.bidForm.get('firstName')?.value;
    const lastName = this.bidForm.get('lastName')?.value;
    const socialName = this.bidForm.get('socialName')?.value;
    const email = this.bidForm.get('email')?.value;
    const check = this.bidForm.get('check')?.value;

    if (value == "" || firstName == "" || lastName == "" || socialName == "" || email == "") {
      this.error.push("Bitte alle Felder ausfüllen");
    }
    if (check != true) {
      this.error.push("Bitte Checkbox akzeptieren")
    }
    if (value < 1) {
      this.error.push("Mindestgebot beträgt 1€")
    }

    if (this.error.length > 0) {
      return;
    }
    const bid = new Bid();
    bid.Email = email;
    bid.FirstName = firstName;
    bid.LastName = lastName;
    bid.Username = socialName;
    bid.Value = value;
    this.bidServce.createBid(bid).subscribe(
      data => {
        this.activeModal.close();
      },
      error => {
        console.error(error);
      }
    );
  }

}
