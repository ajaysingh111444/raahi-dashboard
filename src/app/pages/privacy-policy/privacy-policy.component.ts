import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-privacy-policy",
    templateUrl: "./privacy-policy.component.html",
    styleUrls: ["./privacy-policy.component.css"],
})
export class PrivacyPolicyComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
