import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-about-cure",
    templateUrl: "./about-cure.component.html",
    styleUrls: ["./about-cure.component.css"],
})
export class AboutCureComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
