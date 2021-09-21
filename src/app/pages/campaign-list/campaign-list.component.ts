import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  campaigns = [
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  {
    title:"New Delhi Big conference Tech Collection 2021",
    img:"1.png"
  },
  ]

}
