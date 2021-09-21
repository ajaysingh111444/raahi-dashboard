import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-our-accountability",
    templateUrl: "./our-accountability.component.html",
    styleUrls: ["./our-accountability.component.css"],
})
export class OurAccountabilityComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
