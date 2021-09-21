import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import demodata from "../../../assets/countries.json";
import { ApiService } from "./../../shared/api.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Config } from "src/app/services/config";

declare let $: any;

@Component({
    selector: "app-contact-us",
    templateUrl: "./contact-us.component.html",
    styleUrls: ["./contact-us.component.css"],
})
export class ContactUsComponent implements OnInit, AfterViewInit {

    public countries: any = demodata;
    public contactForm: FormGroup;
    public submitted: boolean = false;
    public descLength: number = 0;
    
    pattern: RegExp = /^( )*([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})( )*$/;

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public apiService: ApiService, public config: Config) { }
    
    get f() {
        return this.contactForm.controls;
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: ["", Validators.required],
            description: ["", [Validators.required, Validators.maxLength(1000)]],
            address: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.pattern(this.pattern)]],
            country: ["", Validators.required],
            subject: ["", Validators.required],
            phonenumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
        });
    }

    ngAfterViewInit() {
        $("#phone").intlTelInput({ preferredCountries: ["in"], separateDialCode: true });
        this.config.dismissLoading();
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

    submitContactForm() {
        this.submitted = true;

        if (this.contactForm.invalid) {
            return;
        }
        else {
            let params = this.contactForm.value;
            params.phonenumber = params.phonenumber.replace(/\s/g, ""); // no spaces are accepted in the API

            this.apiService.postContact(this.contactForm.value).then(
                (data) => {
                    this.toastr.success(data.message);
                    this.contactForm.reset();
                    this.submitted = false;
                },
                (err) => {
                    this.toastr.error(err.title, err.detail);
                }
            );
        }
    }
}
