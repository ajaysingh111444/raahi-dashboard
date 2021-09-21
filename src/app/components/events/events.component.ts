import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../../shared/api.service";
import { ToastrService } from "ngx-toastr";
import { ReCaptcha2Component } from "ngx-captcha";
import * as moment from "moment";
import { Config } from "src/app/services/config";

declare let $: any;
declare var hljs: any;

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit, AfterViewInit {
    @ViewChild("captchaElem") captchaElem: ReCaptcha2Component;

    public contactForm: FormGroup;

    minDob = moment(new Date()).format("1964-12-31");
    maxDob = moment(new Date()).format("2005-12-31");

    submitted = false;
    data: any = {};
    _body: any;
    value: any;
    response: any;

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public api: ApiService,
        public config: Config) {
        this.data = {};
        this.data.firstName = "";
        this.data.gender = "";
        this.data.email = "";
        this.data.dob = "";
        this.data.query = "";
        this.data.number = "";
        // this.data.topic = '';
        this.data.response = "";
    }
    onSubmitContactForm() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.contactForm.valid) {
            // this.api.createWebinar(this.contactForm.value).then(
            //     (res) => {
            //         this.data.response = data["_body"];
            //         //console.log(data);
            //         this.toastr.success(data["message"]);
            //         //console.log(this.contactForm.value);
            //         this.contactForm.reset();
            //         window.open("https://web.raahi.org/event.html");
            //         this.submitted = false;
            //     },
            //     (err) => {
            //          this.toastr.error(err.title, err.detail);
            //     }
            // );
        } else {
            //do nothing
        }
    }

    getToday(): string {
        // return new Date().toISOString().split('T')[0]
        return new Date().toISOString().substring(0, 10);
    }

    get f() {
        return this.contactForm.controls;
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: ["", Validators.required],
            dob: ["", [Validators.min(moment(new Date()).millisecond())]],
            query: [""],
            gender: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}$")]],
            organization: [""],
            // topic:['International Yoga Day'],
            mobile: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        });
    }

    ngAfterViewInit() {
        $("#phone_2").intlTelInput({
            preferredCountries: ["in"],
            separateDialCode: true,
            nationalMode: true,
            customPlaceholder: function (separateDialCode, selectedCountryData) {
                console.log("e.g. ", +separateDialCode);
            },
        });

        this.config.dismissLoading();

        //var input = this.dom.querySelector("#phone_2").intlTelInput('getNumber').replace(+ separateDialCode + );
        //  var countryData = $("#phone_2").intlTelInput("getSelectedCountryData"); // get country data as obj
        //  var countryCode = countryData.dialCode; // using updated doc, code has been replaced with dialCode
        // var intlNumber = $("#phone_2").intlTelInput("getNumber");
        //  countryCode = "+" + countryCode; // convert 1 to +1
        //  var newNo = intlNumber.replace(countryCode, "(" + coountryCode + ")" ); // final version
        // this.dom.getElementById("phone_2").addEventListener('change', function(e){
        //   e.target.value = '+91' + e.target.value;
        // });
    }

    numericOnly(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    handleSuccess(e) {
        console.log("ReCaptcha", e);
    }

    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    openUrl(url: string) {
        window.open(url);
    }
}
