import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-newsletter",
    templateUrl: "./newsletter.component.html",
    styleUrls: ["./newsletter.component.css"],
})
export class NewsletterComponent implements OnInit {
    public newsletterForm: FormGroup;
    data: any = {};
    _body: any;
    value: any;
    response: any;
    submitted = false;
    constructor(public http: HttpClient, public formBuilder: FormBuilder, public toastr: ToastrService) {
        this.newsletterForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z.0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}$")]],
        });
        this.data = {};
        this.data.email = "";
        this.data.response = "";
        this.http = http;
    }
    onSubmitNewsletterForm() {
        this.submitted = true;
        if (this.newsletterForm.invalid) {
            return;
        }
        var link = "https://web.raahi.org/api/newsletter/createNewsletter";
        var contactData = { email: this.data.email };
        this.http.post(link, contactData).subscribe(
            (data) => {
                this.data.response = data["_body"];
                console.log(data);
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
    ngOnInit() {}
    get f() {
        return this.newsletterForm.controls;
    }
}
