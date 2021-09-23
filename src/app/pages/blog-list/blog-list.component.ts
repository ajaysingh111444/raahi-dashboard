import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppAuth } from "../../services/app-auth.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Config } from "src/app/services/config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
    action: string = 'Add';
    temp: any = {};
    categories: Array<any> = [];

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

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth, public config: Config,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        this.blogForm = this.formBuilder.group(
            {
                title: ["", Validators.required],
                categoryid: ["", Validators.required],
                description: ["", Validators.required],
                file: [""],
            },
        );

        this.auth.getCategories().then(
            (cats: any) => {
                this.categories = cats;
                //console.log(this.categories);
            },
            (err: any) => {
                this.toastr.error(err.title, err.detail);
            }
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
               // console.log(this.blogs);
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

    next() {
        let c = this.blogForm.controls;
        console.log(c);

        if (c.title.valid) {
            this.errStep1 = false; // no errors should display
            // TODO: If add-form, then submit blog with title
            if(this.action == 'Add') {
                this.config.showLoading();
                this.newBlog();
            }
            else {
                // do nothing, blog object will retain values for final update
                this.step = 2;
            }
        }
        else {
            this.errStep1 = true // display step 1 errors
        }
    }

    newBlog() {
        let c = this.blogForm.controls;

        let b = {
            "categoryid": c.categoryid.value,
            "title": c.title.value,
            "featuredimage": "",
            "youtubeurl": "",
            "description": "",
            "status": ""
        };
        
        this.auth.addBlog(b).then(
            (res: any) => {
                console.log(res);
                this.step = 2;
                this.temp = res.blog;
                this.config.dismissLoading();
            },
            (err: any) => {
                console.log(err);
                this.config.dismissLoading();
                this.toastr.error(err.title, err.detail);
            }
        )
    }

    previous() {
        if (this.step > 1) {
            this.step--;
        }
    }

    showAddModal(content) {
        this.step = 1;
        this.action = "Add";
        this.blogForm.reset();
        this.temp = null;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-add'});
    }

    showEdit(content, blog) {
        this.step = 1;
        this.action = "Edit";
        this.blogForm.reset();

        this.temp = blog;
        this.setFormValues(blog);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    private setFormValues(blog) {
        let b = this.blogForm.controls;

        b.title.setValue(blog.title);
        b.description.setValue(blog.description);
        b.categoryid.setValue(blog.categoryid);
    }

    submitModal(ref) {
        let c = this.blogForm.controls;

        if (this.blogForm.valid) {
            this.config.showLoading();
            this.errStep2 = false; // no errors should display

            this.temp.title = c.title.value;
            this.temp.description = c.description.value;
            this.temp.categoryid = c.categoryid.value;


            let bl = {
                "bid": this.temp.bid,
                "categoryid": this.temp.categoryid,
                "title": this.temp.title,
                "featuredimage": this.temp.featuredimage || "",
                "youtubeurl": this.temp.youtubeurl || "",
                "description": this.temp.description || "",
                "metatile": this.temp.metatile || "",
                "metakeywords": this.temp.metakeywords || "",
                "metadescription": this.temp.metadescription || "",
                "status": this.temp.status || "",
            }

            // Call blog update method here
            this.auth.updateBlog(bl).then(
                (res: any) => {
                    console.log(res);
                    
                    if(this.action == "Add") {
                        // Add new blog item to blog list
                        this.blogs.options.total = this.blogs.list.unshift(this.temp);
                    }
                    
                    ref.close();
                    this.config.dismissLoading();
                },
                (err: any) => {
                    console.log(err);
                    this.config.dismissLoading();
                    this.toastr.error(err.title, err.detail);
                }
            )
            // TODO: Handle file upload here
        }
        else {
            this.errStep2 = true // display step 2 errors
        }
    }

    confirmDel(ref, blog) {
        this.temp = blog;
        this.modalService.open(ref, {ariaLabelledBy: 'modal-basic-title-add'});
    }

    delBlog(ref) {
        this.config.showLoading();
        this.temp.status = 'deleted';

        let bl = {
            "bid": this.temp.bid,
            "categoryid": this.temp.categoryid,
            "title": this.temp.title,
            "featuredimage": this.temp.featuredimage || "",
            "youtubeurl": this.temp.youtubeurl || "",
            "description": this.temp.description || "",
            "metatile": this.temp.metatile || "",
            "metakeywords": this.temp.metakeywords || "",
            "metadescription": this.temp.metadescription || "",
            "status": 'deleted',
        }

        // Call blog update method here
        this.auth.updateBlog(bl).then(
            (res: any) => {
                console.log(res);
                ref.close();
                this.config.dismissLoading();
            },
            (err: any) => {
                console.log(err);
                this.config.dismissLoading();
                this.toastr.error(err.title, err.detail);
            }
        );
    }

    handleInputChange(f) {
        console.log(f);
        this.config.showLoading();
        
        if(f.base64url && f.base64url.length > 0) {
            let sub = 'data:'+f.type+';base64,';
            let url = f.base64url.replace(sub, '');

            this.auth.uploadMedia(this.temp.bid, f.name, url).then(
                (res: any) => {
                    console.log(res);
                    
                    if(res && res.url && res.url.length > 0) {
                        this.temp.featuredimage = res.url;
                    }
                    
                    this.config.dismissLoading();
                },
                (err: any) => {
                    console.log(err);
                    this.config.dismissLoading();
                    this.toastr.error(err.title, err.detail);
                }
            );
        }
    }
}
