import { Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-why-cure",
    templateUrl: "./why-cure.component.html",
    styleUrls: ["./why-cure.component.css"],
})
export class WhyCureComponent implements OnInit {
    constructor(public config: Config) {}

    ngOnInit() {
        this.config.dismissLoading();
    }
}
