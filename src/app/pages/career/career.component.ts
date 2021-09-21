import { Component, OnInit, ViewChild } from "@angular/core";
import { Config } from "src/app/services/config";
declare var $: any;

@Component({
    selector: "app-career",
    templateUrl: "./career.component.html",
    styleUrls: ["./career.component.css"],
})
export class CareerComponent implements OnInit {

    @ViewChild("slickModal") slickModal;

    constructor(public config: Config) {}

    ngAfterViewInit() {
        $(".client-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: true,
            dots: true,
            autoplay: true,
            autoPlayTimeout: 500,
            lazyLoad: "ondemand",
            prevArrow: '<button type="button" class="slick-c-prev"><i class="flaticon-left-chevron-1"></i></button>',
            nextArrow: '<button type="button" class="slick-c-next"><i class="flaticon-right-chevron-1"></i></button>',
            appendArrows: $(".client-slider-controls"),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
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
        });
    }

    ngOnInit() {
        this.config.dismissLoading();
    }
}
