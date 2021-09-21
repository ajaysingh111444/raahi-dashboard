import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    members = Array(6);
    constructor(private router:Router) {
       // window.location.reload();

    }
    
    ngOnInit(): void {
        
    }
    imgs = [
    {
        t:"Total cases",
        n:"35",
        img:"img-1.png"
    },
    {
        t:"Total cases",
        n:"35",
         img:"img-2.png"
    },
    {
        t:"Total cases",
        n:"35",
         img:"img-3.png"
    },
    {
        t:"Total cases",
        n:"35",
         img:"img-4.png"
    },
    ]
    
    
}
