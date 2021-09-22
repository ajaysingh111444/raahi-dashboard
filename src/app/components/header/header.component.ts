import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    constructor(public router: Router, @Inject(DOCUMENT) private dom: Document, public auth: AppAuth,
        public events: Events) {
    }

    openNav() {
        this.dom.getElementById("mySidenav").style.width = "60%";
        this.dom.getElementById("mySidenavHidden").style.overflow = "hidden";
    }

    closeNav() {
        this.dom.getElementById("mySidenav").style.width = "0";
        this.dom.getElementById("mySidenavHidden").style.overflow = "visible";
    }

    logout() {
        this.events.publish("user:logout", false);
    }

}
