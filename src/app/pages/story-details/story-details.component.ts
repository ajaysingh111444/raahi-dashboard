import { Component, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ScrollService } from "./../../shared/scroll.service";
import { ApiService } from "./../../shared/api.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Config } from "src/app/services/config";

declare var $: any;

@Component({
    selector: "app-story-details",
    templateUrl: "./story-details.component.html",
    styleUrls: ["./story-details.component.css"],
})
export class StoryDetailsComponent implements OnInit {
    urlSafe: SafeResourceUrl;
    youtubeurl: string = "";
    data: any = {};
    res: any;
    public enquiryForm: FormGroup;
    submitted = false;
    storyslug: any;
    storyData: any;
    @Output() public relatedStoriesData: any[];
    currentPageUrl: string = "";

    constructor(
        public formBuilder: FormBuilder,
        private sanitizer: DomSanitizer,
        public router: Router,
        public toastr: ToastrService,
        public apiService: ApiService,
        private route: ActivatedRoute,
        public config: Config
    ) {
        this.storyslug = this.route.snapshot.paramMap.get("storyslug");
        this.res = {};
        this.res.name = "";
        this.res.email = "";
        this.res.mobile = "";
        this.router.events.subscribe((ev) => {
            if (ev instanceof NavigationEnd) {
                this.storyslug = this.route.snapshot.paramMap.get("storyslug");
                this.getStoryDetails();
            }
        });
    }

    ngOnInit() {
        this.currentPageUrl = window.location.href;
        this.getStoryDetails();
        this.enquiryForm = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]{2,4}$")]],
            // email:['', [Validators.required, Validators.email, Validators.pattern('^.+@gmail.com$')]],
            mobile: ["", [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        });
    }

    get f() {
        return this.enquiryForm.controls;
    }
    onSubmitEnquiry() {
        this.submitted = true;
        if (this.enquiryForm.invalid) {
            return;
        }
        this.apiService.createDonate(this.enquiryForm.value).subscribe(
            (data) => {
                this.data.res = data["_body"];
                this.toastr.success(data["message"]);
                this.enquiryForm.reset();
                this.submitted = false;
                window.open("https://web.raahi.org/fundraisers/projectcurecaseajay");
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
            }
        );
    }

    numericOnly(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    goToBankDetails = (element, offsetParam?, speedParam?) => {
        const toElement = $(element);
        const focusElement = $(element);
        const offset = offsetParam * 1 || 100;
        const speed = speedParam * 1 || 500;
        $("html, body").animate(
            {
                scrollTop: toElement.offset().top + offset,
            },
            speed
        );
        if (focusElement) {
            $(focusElement).focus();
        }
    };

    getStoryDetails() {
        this.apiService.getStoryDetails(this.storyslug).then(
            (res: any) => {
                this.storyData = res.story;
                this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.storyData.youtubeurl);
                // console.log(this.urlSafe);
                this.relatedStoriesData = res.relatedstories;
                this.config.dismissLoading();
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
                this.config.dismissLoading();
            }
        );
    }
}
