import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";
@Component({
    selector: "app-our-process",
    templateUrl: "./our-process.component.html",
    styleUrls: ["./our-process.component.css"],
})
export class OurProcessComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
