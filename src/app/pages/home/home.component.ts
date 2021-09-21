import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "./../../shared/api.service";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { globalConstant } from 'src/app/shared/global.modal';
import { Config } from "src/app/services/config";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    public newsletterForm: FormGroup;
    selected: any;
    filtered: any;
    limit = 3;
    pageno = 1;
    search = '';
    caseFilter: any = { title: "" };
    stories: any[] = [];
    options: any;
    isloadMoreBtn = true;
    data: any = {};
    submitted = false;

    constructor(public http: HttpClient, public toastr: ToastrService, public formBuilder: FormBuilder, public apiService: ApiService, 
        public config: Config) {
        // this.getProjectStatics();
        this.newsletterForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}$")]],
        });
        this.data = {};
        this.data.email = "";
        this.data.response = "";
        this.http = http;
    }

    ngOnInit() {
        this.getStoriesList();
    }

    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplaySpeed: 6000,
        arrows: false,
        fade: true,
        speed: 300,
        infinite: true,
        cssEase: "ease-in-out",
        touchThreshold: 100,
        autoplay: true,
    };

    slickInit(e) {
        console.log("slick initialized");
    }

    hsliders = [
        {
            title: "Standing united with our government to win the battle against COVID-19.",
            wimage: "07.webp",
            mimage: "s-7.webp",
        },
        {
            title: "Let’s beat this wave of COVID-19 by maintaining social distance and taking the vaccine",
            wimage: "08.webp",
            mimage: "s-8.webp",
        },
        {
            title: "Committed to a Healthy Human Race for a Better World",
            wimage: "01.webp",
            mimage: "s-1.webp",
        },
        {
            title: "Creating  a Contingency Fund to Help During Medical Emergencies ",
            wimage: "02.webp",
            mimage: "s-2.webp",
        },
        {
            title: "Transforming the Medical Sector Through Technology and Innovations",
            wimage: "03.webp",
            mimage: "s-3.webp",
            r_zero: "r-0",
        },
        {
            title: "Providing  Unconditional Support",
            wimage: "04.webp",
            mimage: "s-4.webp",
        },
        {
            title: "Every Life Counts. A Penny Donated by Millions Can Save a Life",
            wimage: "05.webp",
            mimage: "s-5.webp",
        },
        {
            title: "Covid is a Drastic Wave That Took Lives Away, We Stand by With You in This Pandemic",
            wimage: "06.webp",
            mimage: "s-6.webp",
        },
    ];

    slideConfigCases = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3500,
        prevArrow: '<button type="button" class="slick-medical-prev"><i class="flaticon-left-chevron-1"></i></button>',
        nextArrow: '<button type="button" class="slick-medical-next"><i class="flaticon-right-chevron-1"></i></button>',
        //appendArrows: $('.medical-slider-controls'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    cases = [
        {
            image: "case13.webp",
            title: "Let's unite to help little Mousam fight a leg tumour.",
            content: " Mousam is a six years old young boy and, life is becoming harder for him with every passing day.",
            url: "mousam",
            modal: "#donateFormOurWokrModalMousam",
        },
        {
            image: "case11.webp",
            title: "Help this young mother save her  child.",
            content: "Divyansh is a little three-year-old boy diagnosed with a serious medical condition due to which he faces trouble in passing urine.  ",
            url: "divyansh",
            modal: "#donateFormOurWokrModalDivyansh",
        },
        {
            image: "case14.webp",
            title: "Little Tanaya foot hurts too much, please help her",
            content: "Tanaya is 4 yrs old now and is suffering Local Gigantism , due to which her one leg is abnormal.",
            url: "tanaya",
            modal: "#donateFormOurWokrModalTanaya",
        },
        {
            image: "case15.webp",
            title: "1-year-old baby Gyanvee is struggling to survive, Please help her!",
            content: "Gyanvee is just a year old and she is in immense pain. She is born with a rare medical defect due.",
            url: "gyanvee",
            modal: "#donateFormOurWokrModalGyanvee",
        },
    ];

    onSubmitNewsletterForm() {
        this.submitted = true;
        if (this.newsletterForm.invalid) {
            return;
        }
        var link = "https://web.raahi.org/api/newsletter/createNewsletter";
        var contactData = { email: this.data.email };
        this.http.post(link, contactData).subscribe(
            (data) => {
               // this.data.response = data["_body"];
                //console.log(data);
                this.toastr.success(data["message"]);
                this.newsletterForm.reset();
                this.submitted = false;
            },
            (error) => {
                console.log(error["error"]["message"]);
                this.toastr.error(error["error"]["message"]);
            }
        );
        console.log(this.newsletterForm.value);
    }

    get f() {
        return this.newsletterForm.controls;
    }

    getStoriesList() {
        this.apiService.getStoriesListService(this.limit, this.pageno, this.search).then(
            (story: any) => {
                console.log(story);
                this.data = story.list;
                this.stories = [...this.stories, ...this.data];
                this.options = story.option;
                this.config.dismissLoading();
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
                this.config.dismissLoading();
            }
        );
    }
     getDescriptionsData(data) {
        return data.substring(0, globalConstant.summaryStringlimit)
    }
}
