import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "./../../shared/api.service";

@Component({
    selector: "app-refers",
    templateUrl: "./refers.component.html",
    styleUrls: ["./refers.component.css"],
})
export class RefersComponent implements OnInit {
    @ViewChild("closemodal") closemodal;
    data: any = {};
    images = [];
    res: any;
    public enquiryForm: FormGroup;
    fileToUpload: File = null;
    submitted = false;
    constructor(public formBuilder: FormBuilder, public router: Router, public toastr: ToastrService, public apiService: ApiService) {
        this.res = {};
        this.res.name = "";
        this.res.email = "";
        this.res.phone = "";
        this.res.caseSummary = "";
        this.res.file = "";
    }

    ngOnInit() {
        this.enquiryForm = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}$")]],
            caseSummary: ["", Validators.required],
            file: [""],
            phone: [""],
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
        this.apiService.referToUs(this.enquiryForm.value, this.fileToUpload).subscribe(
            (data) => {
                this.data.res = data["_body"];
                //  console.log(data);
                this.toastr.success(data["message"]);
                this.enquiryForm.reset();
                this.submitted = false;
                this.closemodal.nativeElement.click();
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
            }
        );
    }

    handleFileInput(e: Event) {
        this.fileToUpload = (e.target as HTMLInputElement).files[0];
    }
}
