import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/services/config';
import { ApiService } from 'src/app/shared/api.service';
import { globalConstant } from 'src/app/shared/global.modal';

@Component({
    selector: 'app-blogs',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

    public caseForm: FormGroup;
    selected: any;
    filtered: any;
    limit = 6;
    pageno = 1;
    search = '';
    caseFilter: any = { title: "" };
    blogs: any[] = [];
    data: any[];
    options: any;
    isloadMoreBtn = true;

    constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public apiService: ApiService, 
        public config: Config) {

    }


    ngOnInit() {
        this.caseForm = this.formBuilder.group({
            title: [""],
        });
        this.getBlogList();
    }

    searchData() {
        if (this.caseForm.value.title.length > 0) {
            this.search = this.caseForm.value.title;
            this.getBlogList();
        }
    }

    getBlogList() {
        this.apiService.getBlogListService(this.limit, this.pageno, this.search).then(
            (blogs: any) => {
                this.data = blogs.list;
                this.blogs = [...this.blogs, ...this.data];
                this.options = blogs.options;
                this.config.dismissLoading();
            },
            (err) => {
                this.toastr.error(err.title, err.detail);
                this.config.dismissLoading();
            }
        );
    }

    loanextPageData() {
        let pageno = this.options.pageno + 1;
        if (this.options.total >= pageno) {
            this.pageno = pageno;
            this.getBlogList();
        } else {
            this.isloadMoreBtn = false;
        }
    }

    getDescriptionsData(data) {
        return data.substring(0, globalConstant.summaryStringlimit)
    }


}