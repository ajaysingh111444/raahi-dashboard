import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { globalConstant } from "../../shared/global.modal";
declare let $: any;

@Component({
    selector: 'app-related-stories',
    templateUrl: './related-stories.component.html',
    styleUrls: ['./related-stories.component.css']
})
export class RelatedStoriesComponent implements OnInit {

    @Input() relatedStoriesData: any[];

    constructor() { }


    ngOnInit() { }
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


    getDescriptionsData(data) {
        return data.substring(0, globalConstant.summaryStringlimit)
    }


}
