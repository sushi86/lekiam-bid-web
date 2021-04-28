import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from '../entities/bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(
    private http: HttpClient
  ) { }

  getHighestBid() {
    return this.http.get<Bid>('https://api.lekiam-motorsport.de/bid');
  }

  createBid(bid: Bid) {
    return this.http.post("https://api.lekiam-motorsport.de/bid", bid);
  }
}
