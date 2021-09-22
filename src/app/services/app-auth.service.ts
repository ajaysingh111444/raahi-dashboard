import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Events } from '../shared/app-events';
import { AppHttp } from './app-http.service';
import { Config } from './config';

export class User {
    userId: string;
    authToken: string;
    refreshToken: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    dob: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    profilePic: string;
    roles: Array<string> = [];
    designation: string;

    constructor(userId: string, authToken: string, refreshToken: string, email: string, firstname: string, middlename: string, lastname: string, phoneNumber: string, gender: string, roles: Array<string>) {
        this.userId = userId;
        this.authToken = authToken;
        this.refreshToken = refreshToken;
        this.email = email;
        this.firstName = firstname;
        this.middleName = middlename;
        this.lastName = lastname;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.roles = roles;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AppAuth {

    public currentUser: User;
    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    constructor(public config: Config, private http: AppHttp, public events: Events) {
    }

    /**
     * JSON parser for the class
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
     * Handler for returning a valid error object
     * @param res JSON response returned by web service
     * @returns Object { "title": "Something", "detail": "some detail" };
     */
    private commonErrorHandler(res) {
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
     * Saves updated tokens to localStorage
     * @param tokens updated tokens object with auth and refresh tokens
     */
    public updateTokens = (tokens) => {
        console.log(tokens);
        this.currentUser.authToken = tokens.auth;
        this.currentUser.refreshToken = tokens.refresh;

        localStorage.setItem(`user_${this.config.application}`, JSON.stringify(this.currentUser));
    }

    /**
     * Loads user contexts from localStorage
     * @returns current user if any, or undefined
     */
    public loadStoredUser(): Promise<User | any> {
        return new Promise((resolve) => {
            let u = localStorage.getItem(`user_${this.config.application}`);

            if (u && u.length > 0) {
                let user = JSON.parse(u);
                console.log(u);

                this.currentUser = new User(user.userId, user.authToken, user.refreshToken, user.email, user.firstName, user.middleName, user.lastName, user.phoneNumber, user.gender, user.roles);
                this.config.tokens.auth = user.authToken;
                this.config.tokens.refresh = user.refreshToken;
                this.currentUser.dob = user.dob;
                this.currentUser.profilePic = user.profilePic;
                this.currentUser.designation = user.designation;
                // this.isAuthenticated.next(true); // no, not here
                // this.setProfilePic(user.profilePic);

                resolve(this.currentUser);
            }
            else {
                this.isAuthenticated.next(false);
                resolve(undefined);
            }
        });
    }

    /**
     * Register a user to the application
     * @param data Contact form data object
     * @returns Promise with success or error response
     */
    public register(data): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/register/v1`;
            let auth: boolean = (this.currentUser && this.currentUser.userId) ? false : true;

            this.http.sendRequest("post", url, data, {}, auth).then(
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
     * Trigger forgot password email to user
     * @param email - email of the user
     * @returns 
     */
    public forgotPassword(email) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/password/forgot/v1`;
            let data = { "email": email };
            this.http.sendRequest("POST", url, data, {}, true).then(
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
     * Reset user password
     * @param data object with userid, newpassword and confirmpassword
     * @returns Promise
     */
    public resetPassword(data) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/password/change/v1`;
            this.http.sendRequest("PUT", url, data, {}, true).then(
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
     * Verify email for password reset
     * @param data 
     * @returns 
     */
    public emailverify(data) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/emailverify/v1`;
            this.http.sendRequest("POST", url, data, {}, true).then(
                (data) => {
                    if (data.status == 401) {
                        let err = { 'title': 'Unauthorised Access Detected!', 'detail': 'Please login first.' };
                        reject(err);
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.userid) {
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
     * Login a user to the application
     * @param username 
     * @param password 
     * @returns Promise with the current user object
     */
    public login(username: string, password: string): Promise<any> {
        let headers = {
            "Authorization": 'Basic ' + window.btoa(username + ':' + password)
        };
        let url = `${this.config.baseUri}/user/login/v1`;

        return new Promise((resolve, reject) => {
            this.http.sendRequest('post', url, {}, headers, true).then(
                (data) => {
                    let res = this.parseJson(data.response);

                    if (res && res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.userid) {
                        this.config.tokens.auth = res.data[0].attributes.token;
                        this.config.tokens.refresh = res.data[0].attributes.refreshtoken;

                        this.loadUserFromAPI(res.data[0].attributes.userid, res.data[0].attributes.roles).then((u) => {
                            resolve(this.currentUser);
                            this.isAuthenticated.next(true);
                        }).catch((err) => {
                            console.log(err);
                            reject({ title: "", detail: "Error fetching user details!" });
                        });
                    } else {
                        this.currentUser = undefined;
                        console.log("error", res);
                        let errObj = this.commonErrorHandler(res);
                        reject(errObj);
                    }
                },
                (err) => {
                    this.currentUser = undefined;
                    console.log(err);
                    reject(this.commonErrorHandler(err));
                }
            );
        });
    }

    /**
     * Fetch details of a user
     * @param userid ID of the user
     * @returns Promise with the user object
     */
    public loadUserFromAPI(userid, roles=[]) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/details/v1?userid=${userid}`;

            this.http.sendRequest("get", url).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.user) {
                            let u = res.data[0].attributes.user;

                            this.currentUser = new User(userid, this.config.tokens.auth, this.config.tokens.refresh, u.email, u.firstname, u.middlename, u.lastname, u.phonenumber, u.gender, roles);

                            //Other properties
                            this.currentUser.address1 = u.address1;
                            this.currentUser.address2 = u.address2;
                            this.currentUser.city = u.city;
                            this.currentUser.state = u.state;
                            this.currentUser.country = u.country;
                            this.currentUser.postalcode = u.postalcode;
                            this.currentUser.dob = u.dob;

                            this.currentUser.designation = u.designation

                            let cuStr = JSON.stringify(this.currentUser);
                            localStorage.setItem(`user_${this.config.application}`, cuStr);

                            resolve(this.currentUser);
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
     * Broadcasts app-event for user-logout
     */
    private triggerAuthFail(): void {
        this.events.publish('user:logout', true);
    }

    /**
     * Logout existing user
     * @returns void
     */
    public logout(): Promise<any> {
        this.config.tokens.auth = "";
        this.config.tokens.refresh = "";
        localStorage.removeItem(`user_${this.config.application}`);
        this.currentUser = undefined;
        this.isAuthenticated.next(false);

        return Promise.resolve();
    }

    /**
     * Preload application data for initialisation
     * @returns Promise
     */
    public preloadAppData(): Promise<any> {
        return this.loadUserFromAPI(this.currentUser.userId, this.currentUser.roles).then((res) => {
            console.log(res);

            let promises: Array<Promise<any>> = [
                // call any promise based functions here
            ];

            return Promise.all(promises);
        }).then((res) => {
            this.isAuthenticated.next(true);
            return res;
        }).catch((err) => {
            console.log('Preload app error', err);
        });
    }

    /**
     * Get list of employees by filter
     * @param filter filter value
     * @returns 
     */
    public getEmpList(filter="all") {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/employee/list/v1?filter=${filter}`;

            this.http.sendRequest("get", url).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.list) {
                            resolve(res.data[0].attributes.list);
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
     * Get list of all the roles possible
     * @param filter filter value
     * @returns 
     */
    public getAllRoles(filter="all") {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/roles/v1`;

            this.http.sendRequest("get", url).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.role) {
                            resolve(res.data[0].attributes.role);
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
     * Update user information
     * @param user user object
     * @returns 
     */
    public updateUser(user) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/user/update/v1`;

            this.http.sendRequest("PUT", url, user).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes) {
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
     * Get list of all the categories possible
     * @returns 
     */
     public getCategories() {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/blogs/categories/v1`;

            this.http.sendRequest("get", url).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.list) {
                            resolve(res.data[0].attributes.list);
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
     * Get blogs with desired filters, if any
     * @param limit number of items per page
     * @param page page number for pagination
     * @param keyword search term for blog
     * @param cslug search term for searching in slug of the blogs
     * @returns Promise with blog object
     */
    public getBlogs(limit=10, page=1, keyword="", cslug="") {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/blogs/list/v1?limit=${limit}&pageno=${page}`;

            if(cslug && cslug.length > 0) {
                url += '&cslug='+cslug;
            }

            if(keyword && keyword.length > 0) {
                url += '&search='+keyword;
            }

            this.http.sendRequest("get", url).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes && res.data[0].attributes.blogs) {
                            if(res.data[0].attributes.blogs.data) {
                                // this happens when no data is there, problem in API
                                res.data[0].attributes.blogs['list'] = [];
                                delete res.data[0].attributes.blogs.data;
                            }
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
     * Create blog
     * @param blog blog object
     * @returns 
     */
     public addBlog(blog) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/blogs/v1`;

            this.http.sendRequest("POST", url, blog).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes) {
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
     * Update blog information
     * @param blog blog object
     * @returns 
     */
     public updateBlog(blog) {
        return new Promise((resolve, reject) => {
            let url = `${this.config.baseUri}/blogs/v1`;

            this.http.sendRequest("PUT", url, blog).then(
                (data) => {
                    if (data.status == 401) {
                        this.triggerAuthFail();
                    }
                    else {
                        let res = this.parseJson(data.response);

                        if (res.data && res.data[0] && res.data[0].attributes) {
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
