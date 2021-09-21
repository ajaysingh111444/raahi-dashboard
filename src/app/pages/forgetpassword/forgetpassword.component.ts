import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppAuth } from "src/app/services/app-auth.service";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-forgetpassword",
    templateUrl: "./forgetpassword.component.html",
    styleUrls: ["./forgetpassword.component.css"],
})
export class ForgetpasswordComponent implements OnInit {
    forgetForm: FormGroup;
    submitted = false;
    pattern: RegExp = /^( )*([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})( )*$/;

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth,
        public config: Config) { }

    ngOnInit(): void {
        this.forgetForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.pattern(this.pattern)]],
        });
        this.config.dismissLoading();
    }

    get f() {
        return this.forgetForm.controls;
    }

    forgotPass() {
        this.submitted = true;
        let email = this.forgetForm.value.email.trim();

        if (this.forgetForm.valid) {
            this.config.showLoading();
            
            this.auth.forgotPassword(email).then(
                (res: any) => {
                    this.config.dismissLoading();
                    this.toastr.success(res.message);
                    this.forgetForm.reset();
                    this.submitted = false;
                },
                (err) => {
                    this.config.dismissLoading();
                    this.toastr.error(err.title, err.detail);
                }
            );
        }
        else {
            // do nothing
        }

    }
}
