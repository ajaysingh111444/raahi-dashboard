import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
