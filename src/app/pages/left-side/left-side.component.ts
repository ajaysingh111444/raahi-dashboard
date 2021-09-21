import { Component, OnInit } from '@angular/core';
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
  user:any;
  GetUsertType:any;
  constructor(public auth: AppAuth, public events: Events) { }

  ngOnInit(): void {
      // this.user = localStorage.getItem('user');
       // const user = JSON.parse(localStorage.getItem('user'));
       // this.GetUsertType = user["data"][0]["attributes"]["roles"];
       
  }
  lefts = [
    {
        icon:"icon-material-outline-dashboard",
        name:"Dashboard",
        c:"shadow-lg rounded-lg bg-white px-2 py-2",
        urlLink:"dashboard"
    },
    {
        icon:"icon-material-outline-dashboard",
        name:"Campaign Dashboard",
        urlLink:"campaign-dashboard"
    },
    {
        icon:"icon-material-outline-dashboard",
        name:"Dashboard SEO",
        urlLink:"dashboard-seo"
    },
    {
        icon:"icon-line-awesome-user",
        name:"Account ",
        urlLink:"profile"
    },
    {
        icon:"icon-line-awesome-file-text-o",
        name:"Donor List",
        urlLink:"donor-list"
    },
    {
        icon:"icon-feather-sliders",
        name:"Emp List",
        urlLink:"emp-list"
    },
    {
        icon:"icon-feather-sliders",
        name:"Blog List",
        urlLink:"blog-list"
    },
    {
        icon:"icon-material-outline-description",
        name:"Campaign List",
        urlLink:"campaign-list"
    },
    {
        icon:"icon-feather-printer",
        name:"Payments Received",
        urlLink:"dashboard"
    },
    {
        icon:"icon-line-awesome-user",
        name:"User List",
        urlLink:"user-list"
    },
    {
        icon:"icon-line-awesome-user",
        name:"Volunteer List",
        urlLink:"volunteer-list"
    },
    {
        icon:"icon-line-awesome-user",
        name:"New User",
        urlLink:"add-user"
    },
    {
        icon:"icon-line-awesome-user",
        name:"Profile",
        urlLink:"profile"
    },
    {
        icon:"icon-line-awesome-user",
        name:"Employee Profile",
        urlLink:"employee-profile"
    },
    {
        icon:"icon-line-awesome-heartbeat",
        name:"Story List",
        urlLink:"story-list"
    },
    ]
}
