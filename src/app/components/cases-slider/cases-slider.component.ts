import { Component, OnInit, AfterViewInit } from "@angular/core";
declare let $: any;

@Component({
    selector: "app-cases-slider",
    templateUrl: "./cases-slider.component.html",
    styleUrls: ["./cases-slider.component.css"],
})
export class CasesSliderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
    slideConfig = {
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

    slickInit(e) {
        console.log("slick initialized");
    }
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
            content: "Divyansh is a little three-year-old boy diagnosed with a serious medical condition due to which he faces trouble in passing urine.",
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
}
