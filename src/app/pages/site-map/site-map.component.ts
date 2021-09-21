import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-site-map",
    templateUrl: "./site-map.component.html",
    styleUrls: ["./site-map.component.css"],
})
export class SiteMapComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
