import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "./../../shared/api.service";

declare let $: any;

@Component({
    selector: "app-donate-form",
    templateUrl: "./donate-form.component.html",
    styleUrls: ["./donate-form.component.css"],
})
export class DonateFormComponent implements OnInit {
    @ViewChild("closemodal") closemodal;
    data: any = {};
    res: any;
    public enquiryForm: FormGroup;
    submitted = false;
    constructor(public formBuilder: FormBuilder, public router: Router, public toastr: ToastrService, public apiService: ApiService) {
        this.res = {};
        this.res.name = "";
        this.res.email = "";
        this.res.mobile = "";
    }

    ngOnInit() {
        this.enquiryForm = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}$")]],
            mobile: [""],
        });
    }

    get g() {
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
                //  console.log(data);
                this.toastr.success(data["message"]);
                this.enquiryForm.reset();
                this.submitted = false;
                this.closemodal.nativeElement.click();
                window.open(
                    "https://web.raahi.org/checkout?utf8=%E2%9C%93&currency=inr&payable_amount=2500&origin_id=244471&origin_type=FundraiserCampaign&page_referrer_id=&page_referrer_type=&commit=Donate+now"
                );
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
            }
        );
    }
}
