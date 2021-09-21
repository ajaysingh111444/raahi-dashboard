import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-socialshare',
    templateUrl: './socialshare.component.html',
    styleUrls: ['./socialshare.component.css']
})
export class SocialshareComponent implements OnInit {

    @Input() type: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
    @Input() shareUrl: string;
    navUrl: string;

    constructor() {

    }

    ngOnInit() {
        this.createNavigationUrl();
    }

    private createNavigationUrl() {
        let searchParams = new URLSearchParams();

        switch (this.type) {
            case 'facebook':
                searchParams.set('u', this.shareUrl);
                this.navUrl = 'https://www.facebook.com/sharer/sharer.php?'+ searchParams;
                break;
            case 'twitter':
                searchParams.set('url', this.shareUrl);
                this.navUrl = 'https://twitter.com/share?' + searchParams;
                break;
            case 'instagram':
                this.navUrl = 'http://www.instagram.com/';
                break;
            case 'linkedin':
                searchParams.set('url', this.shareUrl);
                searchParams.set('mini', 'true');
                this.navUrl = 'http://www.linkedin.com/shareArticle?' + searchParams;
                break;
        }
    }

    share() {
        console.log(this.navUrl);
        return window.open(this.navUrl, "_blank");
    }
}
