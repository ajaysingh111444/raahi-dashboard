import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-term-of-use",
    templateUrl: "./term-of-use.component.html",
    styleUrls: ["./term-of-use.component.css"],
})
export class TermOfUseComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
