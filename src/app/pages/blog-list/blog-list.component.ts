import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppAuth } from "../../services/app-auth.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Config } from "src/app/services/config";

@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

    blogForm: FormGroup;
    step: number = 1;
    errStep1: boolean = false;
    errStep2: boolean = false;
    submitting: boolean = false;

    blogs = {
        "options": {
            "limit": 10,
            "pageno": 1,
            "total": 0,
            "offset": 0,
            "search": "",
            "cslug": ""
        },
        "list": []
    }
    
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            ['bold']
        ],
        customClasses: [
            {
                name: "quote",
                class: "quote",
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ]
    };

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth, public config: Config) { }

    ngOnInit(): void {
        this.blogForm = this.formBuilder.group(
            {
                title: ["", Validators.required],
                body: ["", Validators.required],
                file: [""],
            },
        );

        this.getBlogs();
    }

    getBlogs() {
        this.config.showLoading();
        let op = this.blogs.options;
        console.log(op);

        this.auth.getBlogs(op.limit, op.pageno, op.search, op.cslug).then(
            (blog: any) => {
                this.blogs = blog;
                this.config.dismissLoading();
            },
            (err) => {
                console.log(err);
                this.config.dismissLoading();
                this.toastr.error(err.title, err.detail);
            }
        );
    }

    public onPagination(page: any) {
        console.log(page);
        console.log(this.blogs.options);
        this.getBlogs();
    }

    setPageSize() {
        console.log(this.blogs.options);
        this.getBlogs();
    }

    get f() {
        return this.blogForm.controls;
    }

    blogSubmit() {
        this.submitting = true;

        if (this.blogForm.valid) {
            // TODO: Submit Blog
            // let u = this.blogForm.value;
            // this.auth.register(u).then(
            //     (data) => {
            //         this.toastr.success(data.message);
            //         this.blogForm.reset();
            //         this.submitting = false;
            //     },
            //     (err) => {
            //         this.toastr.error(err.title, err.detail);
            //         this.submitting = false;
            //     }
            // );
        }
        else {
            this.errStep2 = true;
        }
    }

    validateStep1() {
        let c = this.blogForm.controls;
        console.log(c);

        if (c.title.valid) {
            this.errStep1 = false; // no errors should display
            this.step = 2;
        }
        else {
            this.errStep1 = true // display step 1 errors
        }
    }

    validateStep2() {
        let c = this.blogForm.controls;
        console.log(c);

        if (c.title.valid) {
            this.errStep2 = false; // no errors should display
            this.step = 3;
        }
        else {
            this.errStep2 = true // display step 2 errors
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
        if (this.step > 1) {
            this.step--;
        }
    }
}
