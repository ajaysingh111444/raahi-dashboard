import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Config {

    constructor() { }

    public application = "Raahi";
    public tagline = "Providing Medical Access to the Poor";

    public appUri: string = 'https://raahi.org';
    public baseUri: string = 'https://api.raahi.org';
    public apiKey: string = 'Service qrgUGrVfzKnl7dEAmwR6LLbprbuuqtzm';

    public isLoading: boolean = false; // Never edit this directly, call the functions

    /**
     * Show a loader
     */
    public showLoading() {
        this.isLoading = true;
    }

    /**
     * Dismiss loader
     */
    public dismissLoading() {
        this.isLoading = false;
    }

    public defaultError = {
        title: '',
        detail: 'Unexpected Error Occured! Please try again...'
    }

    public tokens = {
        "auth": "",
        "refresh": ""
    }

   

    public statusList = [
        {
            value: 'draft',
            title: 'Draft'
        },
        {
            value: 'inreview',
            title: 'In Review'
        },
        {
            value: 'hold',
            title: 'On Hold'
        },
        {
            value: 'published',
            title: 'Published'
        },
        {
            value: 'deleted',
            title: 'Deleted'
        }
    ];

}
