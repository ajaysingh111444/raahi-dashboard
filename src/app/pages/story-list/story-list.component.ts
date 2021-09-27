import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppAuth } from "../../services/app-auth.service";
import { Config } from "src/app/services/config";
import { NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RegExpPatterns } from "src/app/shared/app-validators";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

    storyForm: FormGroup;
    step: number = 1;
    errStep1: boolean = false;
    errStep2: boolean = false;
    submitting: boolean = false;
    action: string = 'Add';
    temp: any = {};
    categories: Array<any> = [];
    displayName: string;
    mnDate: any;
    mxDate: any;

    stories = {
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
    
    patterns = new RegExpPatterns();

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth, public config: Config,
        private modalService: NgbModal) {
            
        this.displayName = this.auth.currentUser.firstName +' '+this.auth.currentUser.lastName;
        
        let today = moment().add(1, 'days');
        
        this.mnDate = { year: today.year(), month: today.month()+1, day: today.date() };
        this.mxDate = { year: today.add(10, 'years').year(), month: today.month()+1, day: today.date() };
    }

    ngOnInit(): void {
        this.storyForm = this.formBuilder.group({
            title: ["", [Validators.required]],
            name: ["", [Validators.required]],
            slug: ["", [Validators.required]],
            categoryid: ["", [Validators.required]],
            description: ["", [Validators.required]],
            youtubeurl: ["", [Validators.pattern(this.patterns.url)]],
            targetdate: ["", [Validators.required]],
            targetamount: ["", [Validators.required, Validators.min(100)]],
            targetcurrency: ["", [Validators.required]],
        });

        this.auth.getStoryCategories().then(
            (cats: any) => {
                this.categories = cats;
                console.log(this.categories);
            },
            (err: any) => {
                this.toastr.error(err.title, err.detail);
            }
        );

        this.getStories();
    }

    updateSlug() {
        if(this.action == 'Add') {
            let s = (`${this.f.name.value} ${this.f.title.value} ${Date.now()}`);
            s = s.toLowerCase().replace(/ +/g, '-');
            console.log(s);
            this.f.slug.setValue(s);
        }
    }

    getStories() {
        this.config.showLoading();
        let op = this.stories.options;
        console.log(op);

        this.auth.getStories(op.limit, op.pageno, op.search, op.cslug).then(
            (st: any) => {
                this.stories = st;
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
        // console.log(page);
        // console.log(this.stories.options);
        this.getStories();
    }

    setPageSize() {
        console.log(this.stories.options);
        this.getStories();
    }

    get f() {
        return this.storyForm.controls;
    }

    private getDate() {
        let d = this.f.targetdate.value;
        let m: any = d.month;
        
        if(m < 10) {
            m = '0' + m.toString();
        }
        
        return `${d.year}-${m}-${d.day}`;
    }

    next() {
        let c = this.storyForm.controls;
        console.log(c);

        if (c.title.valid) {
            this.errStep1 = false; // no errors should display
            // If add-form, then submit story with title
            if(this.action == 'Add') {
                this.config.showLoading();
                this.newStory();
            }
            else {
                // do nothing, story object will retain values for final update
                this.step = 2;
            }
        }
        else {
            this.errStep1 = true // display step 1 errors
        }
    }

    newStory() {
        let c = this.storyForm.controls;

        let st = {
            "organizationid": this.auth.currentUser.orgId,
            "categoryid": c.categoryid.value,
            "title": c.title.value,
            "name": c.name.value,
            "story": "",
            "featuredimage": "",
            "youtubeurl": "",
            "slug": c.slug.value,
            "report": {},
            "targetdate": "",
            "targetamount": "",
            "targetcurrency": ""
        }
        
        this.auth.addStory(st).then(
            (res: any) => {
                console.log(res);
                this.step = 2;
                this.temp = res.story;
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
        this.storyForm.reset();
        this.storyForm.controls.categoryid.setValue(this.categories[0].categoryid);
        this.storyForm.controls.targetamount.setValue(100);
        this.storyForm.controls.name.setValue(this.displayName);
        this.temp = null;
        this.modalService.open(content, { size: 'lg', scrollable: false });
    }

    showEdit(content, story) {
        this.step = 1;
        this.action = "Edit";
        this.storyForm.reset();

        this.temp = story;
        this.setFormValues(story);
        this.modalService.open(content, { size: 'lg', scrollable: false });
    }

    private setFormValues(story) {
        let b = this.storyForm.controls;

        b.title.setValue(story.title);
        b.name.setValue(story.name);
        b.slug.setValue(story.slug);
        b.categoryid.setValue(story.categoryid);
        b.description.setValue(story.story);
        b.youtubeurl.setValue(story.youtubeurl);
        b.targetamount.setValue(story.targetamount);
        b.targetcurrency.setValue(story.targetcurrency);

        // Handling date
        let d = story.targetdate.split('T')[0].split('-');
        
        if(d.length == 3) {
            let ngdt = new NgbDate(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]));
            b.targetdate.setValue(ngdt);
        }
    }

    submitModal(ref) {
        let c = this.storyForm.controls;

        if (this.storyForm.valid) {
            this.config.showLoading();
            this.errStep2 = false; // no errors should display

            this.temp.title = c.title.value;
            this.temp.story = c.description.value;
            this.temp.categoryid = c.categoryid.value;
            this.temp.slug = c.slug.value;
            this.temp.name = c.name.value;
            this.temp.youtubeurl = c.youtubeurl.value;
            this.temp.targetdate = this.getDate();
            this.temp.targetamount = c.targetamount.value;
            this.temp.targetcurrency = c.targetcurrency.value;

            // Call story update method here
            this.auth.updateStory(this.temp).then(
                (res: any) => {
                    console.log(res);
                    
                    if(this.action == "Add") {
                        // Add new story item to story list
                        this.stories.options.total = this.stories.list.unshift(this.temp);
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
        }
        else {
            this.errStep2 = true // display step 2 errors
            console.log(this.f);
        }
    }

    confirmDel(ref, story) {
        this.temp = story;
        this.modalService.open(ref, {ariaLabelledBy: 'modal-basic-title-add'});
    }

    delStory(ref) {
        this.config.showLoading();
        
        // Call story delete method here
        this.auth.deleteStory(this.temp.stid).then(
            (res: any) => {
                console.log(res);
                this.temp.status = 'deleted';
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

            this.auth.uploadMediaStories(this.temp.stid, f.name, url).then(
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
