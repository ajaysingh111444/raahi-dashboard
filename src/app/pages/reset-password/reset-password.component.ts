import { Component, OnInit } from '@angular/core';
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    constructor(public auth: AppAuth, public events: Events) { }

    ngOnInit(): void {
    }

    logout() {
        this.events.publish("user:logout", false);
    }
}
