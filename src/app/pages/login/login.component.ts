import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { AppAuth } from "../../services/app-auth.service";
import { Config } from "src/app/services/config";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    pattern: RegExp = /^( )*([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})( )*$/;

    constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public toastr: ToastrService,
        public auth: AppAuth, public router: Router, public config: Config) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            password: ["", Validators.required],
            email: ["", [Validators.required, Validators.pattern(this.pattern)]]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.config.dismissLoading();
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmitLogin() {
        this.submitted = true;

        if (this.loginForm.valid) {
            let password = this.loginForm.value.password.trim();
            let email = this.loginForm.value.email.trim();

            // trimmed length can differ from actual length
            if (password.length && email.length) {
                this.config.showLoading();
                this.auth.login(email, password).then(
                    (res) => {
                        console.log(res);
                        this.loginForm.reset();
                        this.submitted = false;
                        this.config.dismissLoading();

                        if (this.auth.currentUser?.roles[0] == 'campaignmanagerteamlead') {
                            this.router.navigate(["/campaign-dashboard"]);
                        }
                        else if (this.auth.currentUser?.roles[0] == 'seoteamlead') {
                            this.router.navigate(["/dashboard-seo"]);
                        }
                        else {
                            this.router.navigate(["/dashboard"]);
                        }
                       
                    },
                    (err) => {
                        this.config.dismissLoading();
                        this.toastr.error(err.title, err.detail);
                    }
                );
            }
            else {
                this.toastr.error("Fields cannot contain empty spaces!");
            }
        }
        else {
            return;
        }
    }
}
