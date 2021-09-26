import { Injectable } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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

    public editorConfig: AngularEditorConfig = {
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
    }

}
