import { Title, Meta, MetaDefinition } from "@angular/platform-browser";
import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class SeoService {
    constructor(private title: Title, private router: Router, private meta: Meta, @Inject(DOCUMENT) private dom) {}

    updateTitle(title: string) {
        this.title.setTitle(title);
    }

    updateMetaTags(metaTags: MetaDefinition[]) {
        metaTags.forEach((m) => this.meta.updateTag(m));
    }

    createLinkForCanonicalURL() {
        let link: HTMLLinkElement = this.dom.createElement("link");
        link.setAttribute("rel", "canonical");
        this.dom.head.appendChild(link);
        link.setAttribute("href", "https://web.raahi.org/" + this.router.url);
    }
}
