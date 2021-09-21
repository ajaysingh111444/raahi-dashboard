import { Injectable } from "@angular/core";
import { Contact } from "./contact";
import { Config } from "../services/config";
import { AppHttp } from "../services/app-http.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ApiService {

    constructor(private http: HttpClient, public config: Config, public appHttp: AppHttp) { }

    /**
     * 
     * @param str A valid JSON string
     * @returns Object, if str is parsable, otherwise the same string is returned
     */
    private parseJson(str) {
        let data;

        try {
            data = JSON.parse(str);
        }
        catch (e) {
            data = str;
        }

        return data;
    }

    /**
     * 
     * @param res JSON response returned by web service
     * @returns Object { "title": "Something", "detail": "some detail" };
     */
    commonErrorHandler(res) {
        if (res.errors && res.errors.length > 0) {
            // See of there are errors returned by server
            return res.errors[0];
        }
        else {
            // Else return a generic error object as per config
            return this.config.defaultError;
        }
    }

    /**
     * 
     * @param data Contact form data object
     * @returns Promise with success or error response
     */
    postContact(data: Contact): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/contact/v1`;
            this.appHttp.sendRequest("post", url, data, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.message) {
                            resolve(res.data[0].attributes);
                        }
                        else {
                            console.log("error", res);
                            let errObj = this.commonErrorHandler(res);
                            reject(errObj);
                        }
                    }
                },
                (err) => {
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }

    /**
     * DUMMY CALL - *** API NOT READY YET ***
     * @param data 
     * @returns 
     */
    createDonate(data) {
        const formDataile = new FormData();
        const API_URL = `${this.config.baseUri}/view/createDonate`;
        return this.http.post(API_URL, data);//.pipe(catchError(this.errorMgmt));
    }

    /**
     * DUMMY CALL - *** API NOT READY YET ***
     * @param data 
     * @param File 
     * @returns 
     */
    referToUs(data, File) {
        const formData = new FormData();
        const API_URL = `${this.config.baseUri}/view/insertRefer`;
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("caseSummary", data.caseSummary);
        formData.append("file", File, File.name);
        // formData.append('file', fileToUpload, fileToUpload.name);
        console.log(data);
        return this.http.post(API_URL, formData);//.pipe(catchError(this.errorMgmt));
    }

    /**
     * Get Blog List data
     * @param limit 
     * @param pageno 
     * @param search 
     * @returns Promise with blogs object
     */
    getBlogListService(limit, pageno, search) {
        return new Promise((resolve, reject) => {
            let queryParams = '';

            if (limit && limit != null && limit != undefined) {
                queryParams = queryParams + 'limit=' + limit;
            }
            if (pageno && pageno != null && pageno != undefined) {
                queryParams = queryParams + '&pageno=' + pageno;
            }
            if (search && search != null && search != undefined) {
                queryParams = queryParams + '&search=' + search;
            }

            let url = `${this.config.baseUri}/blogs/search/v1?${queryParams}`;
            this.appHttp.sendRequest("GET", url, {}, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);
                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.blogs) {
                            resolve(res.data[0].attributes.blogs);
                        }
                        else {
                            console.log("error", res);
                            let errObj = this.commonErrorHandler(res);
                            reject(errObj);
                        }
                    }
                },
                (err) => {
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }

    /**
     * Get details of blog by slug
     * @param blogslug slug of the blog
     * @returns 
     */
    getBlogDetails(blogslug) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/blogs/details/v1/${blogslug}`;
            this.appHttp.sendRequest("GET", url, {}, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);
                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.blogs) {
                            resolve(res.data[0].attributes);
                        }
                        else {
                            console.log("error", res);
                            let errObj = this.commonErrorHandler(res);
                            reject(errObj);
                        }
                    }
                },
                (err) => {
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }


    /**
     * Get story list
     * @param limit 
     * @param pageno 
     * @param search 
     * @returns Promise with story objects
     */
    getStoriesListService(limit, pageno, search) {
        return new Promise((resolve, reject) => {
            let queryParams = '';

            if (limit && limit != null && limit != undefined) {
                queryParams = queryParams + 'limit=' + limit;
            }
            if (pageno && pageno != null && pageno != undefined) {
                queryParams = queryParams + '&pageno=' + pageno;
            }
            if (search && search != null && search != undefined) {
                queryParams = queryParams + '&search=' + search;
            }

            let url = `${this.config.baseUri}/stories/search/v1?${queryParams}`;
            this.appHttp.sendRequest("GET", url, {}, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);
                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.story) {
                            resolve(res.data[0].attributes.story);
                        }
                        else {
                            console.log("error", res);
                            let errObj = this.commonErrorHandler(res);
                            reject(errObj);
                        }
                    }
                },
                (err) => {
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }

    /**
     * Get details of a story by slug
     * @param storyslug - slug of the story
     * @returns 
     */
    getStoryDetails(storyslug) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/stories/details/v1/${storyslug}`;
            this.appHttp.sendRequest("GET", url, {}, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);
                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.story) {
                            resolve(res.data[0].attributes);
                        }
                        else {
                            console.log("error", res);
                            let errObj = this.commonErrorHandler(res);
                            reject(errObj);
                        }
                    }
                },
                (err) => {
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }
}
