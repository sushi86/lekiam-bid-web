import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bid } from 'src/app/entities/bid';
import { BidService } from 'src/app/services/bid.service';
import { BidModalComponent } from '../bid-modal/bid-modal.component';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  public date = new Date(2021, 5, 2, 0, 0);
  public bid!: Bid;
  config = {
    stopTime: 1619906400000,
    format: 'd \'Tage\' h \'Stunden\' mm \'Minuten\' s \'Sekunden\''
  }

  constructor(
    private modalService: NgbModal,
    private bidService: BidService
  ) { }

  ngOnInit(): void {
    this.getHighestBid();
  }

  getHighestBid() {
    this.bidService.getHighestBid().subscribe(
      data => {
        this.bid = data;
      },
      error => {
        console.error(error)
      }
    );
  }

  open() {
    const modalRef = this.modalService.open(BidModalComponent);
    modalRef.result.then((result) => {
      this.getHighestBid();
    });

  }
}
