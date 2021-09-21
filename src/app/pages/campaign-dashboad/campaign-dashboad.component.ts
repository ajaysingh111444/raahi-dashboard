import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-dashboad',
  templateUrl: './campaign-dashboad.component.html',
  styleUrls: ['./campaign-dashboad.component.css']
})
export class CampaignDashboadComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  
  }
  campaigns = [
  {
    date:"08/08/2021",
    r:"2500",
    rs:"1700",
    exp:"28/08/2021"
  },
  {
    date:"08/08/2021",
    r:"2500",
    rs:"1700",
    exp:"28/08/2021"
  },
  {
    date:"08/08/2021",
    r:"2500",
    rs:"1700",
    exp:"28/08/2021"
  },
  ]
  tables = [
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },
  {
    c_name:"New Delhi Business Tech Event",
    c_type:"Business Event",
    s_date:"25/07/2021",
    e_date:"01/08/2021",
  },

  ]
}
