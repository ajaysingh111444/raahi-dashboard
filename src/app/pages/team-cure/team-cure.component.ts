import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-team-cure",
    templateUrl: "./team-cure.component.html",
    styleUrls: ["./team-cure.component.css"],
})
export class TeamCureComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
