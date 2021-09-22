import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { SeoService } from "./shared/seo.service";
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from "@angular/router";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { Events } from "./shared/app-events";
import { AppAuth } from "./services/app-auth.service";
import { ToastrService } from "ngx-toastr";
import { Config } from "./services/config";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit {

    preloader: boolean = true;
    showHeaderFooter: boolean = false;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private seoService: SeoService,
        public events: Events,
        public auth: AppAuth,
        public toastr: ToastrService,
        public config: Config
    ) {
        this.config.showLoading(); // Show loader by default
    }

    ngOnInit(): void {
        this.router.events
        .pipe(
            filter((e) => e instanceof NavigationEnd),
            map((e) => this.activatedRoute),
            map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            filter((route) => route.outlet === "primary"),
            mergeMap((route) => route.data)
        )
        .subscribe((data) => {
            let seoData = data["seo"];
            this.seoService.updateTitle(seoData["title"]);
            this.seoService.updateMetaTags(seoData["metaTags"]);
            this.seoService.createLinkForCanonicalURL();
        });
       //show header by vijay 
      this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/register' || event['url'] == '/forgetpassword') {
          this.showHeaderFooter = false;
        } else {
          this.showHeaderFooter = true;
        }
      }
    });

    }

    ngAfterViewInit() {
        this.events.subscribe("user:logout", (showDialog) => {
            // this.analytics.recordEvent("logout");
            this.auth.logout();
            this.router.navigate(["/login"], { replaceUrl: true });

            if (showDialog) {
                setTimeout(() => {
                    this.toastr.error("Your session has expired, please login again!");
                }, 500);
            }
        });

        this.events.subscribe("tokenChanged", (tokens) => {
            this.auth.updateTokens(tokens); // or this, not both
        });

        this.events.subscribe("refreshFail", () => {
            this.events.publish("user:logout", true);
        });

        this.initializeUser();
    }

    async initializeUser() {
        let res = await this.auth.loadStoredUser();
       // console.log(res);

        if (res !== undefined) {
            await this.auth.preloadAppData();
            
            setTimeout(() => {
                this.preloader = false;
            }, 500);
            // this.analytics.recordEvent("autologin");
        } else {
            // this.router.navigate(['/'], { replaceUrl: true });
            setTimeout(() => {
                this.preloader = false;
            }, 500);
        }
    }
}
