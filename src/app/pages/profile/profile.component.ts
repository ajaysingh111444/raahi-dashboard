import { Component, OnInit } from '@angular/core';
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AppAuth, public events: Events) { }

  ngOnInit(): void {
  }
  logout() {
        this.events.publish("user:logout", false);
    }
}
