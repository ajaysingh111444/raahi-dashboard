import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-what-we-do",
    templateUrl: "./what-we-do.component.html",
    styleUrls: ["./what-we-do.component.css"],
})
export class WhatWeDoComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
