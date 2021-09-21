import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private dom: Document) {}
    ngOnInit() {}
  
}
