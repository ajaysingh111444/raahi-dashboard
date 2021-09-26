import { Component, OnInit } from '@angular/core';
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
 
  constructor(public auth: AppAuth, public events: Events) { }

  ngOnInit(): void { }
 
}
