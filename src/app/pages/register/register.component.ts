import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment-timezone";
import { AppAuth } from "../../services/app-auth.service";
import demodata from "../../../assets/countries.json";
import { MustMatch } from "src/app/shared/app-validators";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit, AfterViewInit {

    @ViewChild('zip') zipcode: ElementRef;
    countries: any = demodata;
    registerForm: FormGroup;
    pattern: RegExp = /^( )*([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})( )*$/;
    step: number = 1;
    errStep1: boolean = false;
    errStep2: boolean = false;
    errStep3: boolean = false;
    submitting: boolean = false;
    mnDate: any;
    mxDate: any;

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth,
        public config: Config) {
        
        this.mnDate = { year: moment().subtract(60, 'years').year(), month: 1, day: 1 };
        this.mxDate = { year: moment().year(), month: moment().month(), day: moment().date() };

        console.log(this.mnDate, this.mxDate);
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                firstname: ["", Validators.required],
                lastname: ["", Validators.required],
                middlename: [""],
                email: ["", [Validators.required, Validators.email, Validators.pattern(this.pattern)]],
                password: ["", Validators.required],
                confirmPassword: ['', Validators.required],
                phonenumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
                dob: ["", Validators.required],
                gender: ["", Validators.required],
                city: ["", Validators.required],
                state: ["", Validators.required],
                address1: ["", Validators.required],
                address2: ["", Validators.required],
                country: ["", Validators.required],
                postalcode: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
            },
            { validators: [MustMatch('password', 'confirmPassword'), MustMatch( 'confirmPassword', 'password')] }
        );
    }

    ngAfterViewInit() {
        ($("#phone") as any).intlTelInput({ preferredCountries: ["in"], separateDialCode: true });
        this.config.dismissLoading();
    }

    get f() {
        return this.registerForm.controls;
    }

    register() {
        this.submitting = true;

        if (this.registerForm.valid) {
            this.config.showLoading();
            
            let u = this.registerForm.value;
            u.phonenumber = u.phonenumber.replace(/\s/g, ""); // no spaces are accepted in the API
            
            u["timezone"] = moment.tz.guess();
            u["role"] = "user";
            u["additionaldata"] = "";
            
            let dob = `${u.dob.day}-${u.dob.month}-${u.dob.year}`;
            u.dob = dob;

            this.auth.register(u).then(
                (data) => {
                    this.config.dismissLoading();
                    this.toastr.success(data.message);
                    this.registerForm.reset();
                    this.submitting = false;
                },
                (err) => {
                    this.config.dismissLoading();
                    this.toastr.error(err.title, err.detail);
                    this.submitting = false;
                }
            );
        }
        else {
            this.errStep3 = true;
        }
    }

    validateStep1() {
        let c = this.registerForm.controls;
        console.log(c);
        
        if (c.firstname.valid && c.lastname.valid && c.email.valid) {
            this.errStep1 = false; // no errors should display
            this.step = 2;
        }
        else {
            this.errStep1 = true // display step 1 errors
        }
    }

    validateStep2() {
        let c = this.registerForm.controls;
        console.log(c);
        
        if (c.password.valid && c.phonenumber.valid && c.dob.valid && c.gender.valid) {
            this.errStep2 = false; // no errors should display
            this.step = 3;
        }
        else {
            this.errStep2 = true // display step 1 errors
        }
    }

    next() {
        if (this.step == 1) {
            this.validateStep1();
        }
        else if (this.step == 2) {
            this.validateStep2();
        }
    }

    previous() {
        if(this.step > 1) {
            this.step--;
        }
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

    googleLogin() {
        console.log("google login triggerred!");
    }

    countryChanged(c) {
        console.log(c);
        
        if(c == 'India') {
            console.log(this.zipcode);
            this.zipcode.nativeElement.onkeypress = this.numericOnly;
            
            if(isNaN(parseInt(this.f.postalcode.value))) {
                this.f.postalcode.setValue('');
            }
        }
        else {
            this.zipcode.nativeElement.onkeypress = null;
        }
    }
}
