import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { Events } from "../../shared/app-events";
import { AppAuth } from "../../services/app-auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
    display: boolean = false;
    
    constructor(public router: Router, @Inject(DOCUMENT) private dom: Document, public auth: AppAuth,
        @Inject(PLATFORM_ID) private platformId: Object, public events: Events) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.display = true;
        }
    }

    openNav() {
        this.dom.getElementById("mySidenav").style.width = "60%";
        this.dom.getElementById("mySidenavHidden").style.overflow = "hidden";
    }

    closeNav() {
        this.dom.getElementById("mySidenav").style.width = "0";
        this.dom.getElementById("mySidenavHidden").style.overflow = "visible";
    }

    HiddenNav() {
        this.dom.getElementById("mySidenav").style.width = "0";
        this.dom.getElementById("mySidenavHidden").style.overflow = "visible";
    }

    logout() {
        this.events.publish("user:logout", false);
    }

}
