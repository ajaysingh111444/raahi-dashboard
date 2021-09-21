import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/services/config';
import { ApiService } from 'src/app/shared/api.service';
import { globalConstant } from 'src/app/shared/global.modal';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

    public caseForm: FormGroup;
    selected: any;
    filtered: any;
    limit = 3;
    pageno = 1;
    search = '';
    caseFilter: any = { title: "" };
    stories: any[] = [];
    data: any[];
    options: any;
    isloadMoreBtn = true;

    constructor(public http: HttpClient, public formBuilder: FormBuilder, public toastr: ToastrService, public apiService: ApiService,
        public config: Config) {

    }


    ngOnInit() {
        this.caseForm = this.formBuilder.group({
            title: [""],
        });
        this.getStoriesList();
    }

    getStoriesList() {
        this.apiService.getStoriesListService(this.limit, this.pageno, this.search).then(
            (story: any) => {
                console.log(story);
                this.data = story.list;
                this.stories = [...this.stories, ...this.data];
                this.options = story.option;
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
            this.getStoriesList();
        } else {
            this.isloadMoreBtn = false;
        }
    }

    getDescriptionsData(data) {
        return data.substring(0, globalConstant.summaryStringlimit)
    }

    searchData() {
        if (this.caseForm.value.title.length > 0) {
            this.search = this.caseForm.value.title;
            this.getStoriesList();
        }
    }

}
