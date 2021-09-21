import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
