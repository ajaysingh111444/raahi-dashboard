import { BrowserModule, Meta } from "@angular/platform-browser";
import * as $ from "jquery";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCaptchaModule } from "ngx-captcha";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule, DatePipe, DecimalPipe } from "@angular/common";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { AboutCureComponent } from "./pages/about-cure/about-cure.component";
import { WhatWeDoComponent } from "./pages/what-we-do/what-we-do.component";
import { OurAccountabilityComponent } from "./pages/our-accountability/our-accountability.component";
import { WhyCureComponent } from "./pages/why-cure/why-cure.component";
import { TeamCureComponent } from "./pages/team-cure/team-cure.component";
import { CareerComponent } from "./pages/career/career.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
import { TermOfUseComponent } from "./pages/term-of-use/term-of-use.component";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";
import { CasesSliderComponent } from "./components/cases-slider/cases-slider.component";
import { SiteMapComponent } from "./pages/site-map/site-map.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FilterPipeModule } from "ngx-filter-pipe";
import { OurProcessComponent } from "./pages/our-process/our-process.component";
import { DonateFormComponent } from "./components/donate-form/donate-form.component";
import { RefersComponent } from "./components/refers/refers.component";
import { NewsComponent } from "./components/news/news.component";
import { EventsComponent } from "./components/events/events.component";
import { AutoCompleteInputDirective } from "./directives/AutoCompleteInputDirective";
import { ForgetpasswordComponent } from "./pages/forgetpassword/forgetpassword.component";
import { LoginComponent } from "./pages/login/login.component";
import { RecreatepasswardComponent } from "./pages/recreatepassward/recreatepassward.component";
import { RegisterComponent } from "./pages/register/register.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BlogsComponent } from "./pages/blogs/blogs.component";
import { StoriesComponent } from "./pages/stories/stories.component";
import { BlogDetailsComponent } from "./pages/blog-details/blog-details.component";
import { StoryDetailsComponent } from "./pages/story-details/story-details.component";
import { CompaignComponent } from "./pages/compaign/compaign.component";
import { LeftSideComponent } from "./pages/left-side/left-side.component";
import { RelatedBlogsComponent } from "./components/related-blogs/related-blogs.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { CampaignListComponent } from "./pages/campaign-list/campaign-list.component";
import { RelatedStoriesComponent } from "./components/related-stories/related-stories.component";
import { CampaignDashboadComponent } from "./pages/campaign-dashboad/campaign-dashboad.component";

import { SocialshareComponent } from "./components/socialshare/socialshare.component";
import { Config } from "./services/config";
import { AppAuth } from "./services/app-auth.service";
import { AppHttp } from "./services/app-http.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RaahiSeoComponent } from "./pages/raahi-seo/raahi-seo.component";
import { BlogListComponent } from "./pages/blog-list/blog-list.component";
import { DonorListComponent } from "./pages/donor-list/donor-list.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { VolunteerListComponent } from "./pages/volunteer-list/volunteer-list.component";
import { AddBlogComponent } from "./pages/add-blog/add-blog.component";
import { AddUserComponent } from "./pages/add-user/add-user.component";
import { EmployeeListComponent } from "./pages/employee-list/employee-list.component";
import { EmployeeProfileComponent } from "./pages/employee-profile/employee-profile.component";
import { StoryListComponent } from "./pages/story-list/story-list.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ChartsModule } from "ng2-charts";

import { SortableHeaderDirective } from "./directives/sortable.directive";
import { TableService } from "./services/table.service";

@NgModule({
    declarations: [
        ForgetpasswordComponent,
        LoginComponent,
        AppComponent,
        RecreatepasswardComponent,
        RegisterComponent,
        // HomeComponent,
        HeaderComponent,
        FooterComponent,
        ContactUsComponent,
        AboutCureComponent,
        WhatWeDoComponent,
        OurAccountabilityComponent,
        WhyCureComponent,
        TeamCureComponent,
        CareerComponent,
        PrivacyPolicyComponent,
        TermOfUseComponent,
        NewsletterComponent,
        CasesSliderComponent,
        SiteMapComponent,
        OurProcessComponent,
        DonateFormComponent,
        RefersComponent,
        NewsComponent,
        EventsComponent,
        AutoCompleteInputDirective,
        DashboardComponent,
        BlogsComponent,
        StoriesComponent,
        BlogDetailsComponent,
        StoryDetailsComponent,
        CompaignComponent,
        LeftSideComponent,
        RelatedBlogsComponent,
        ProfileComponent,
        ResetPasswordComponent,
        CampaignListComponent,
        RelatedStoriesComponent,
        CampaignDashboadComponent,
        SocialshareComponent,
        RaahiSeoComponent,
        BlogListComponent,
        DonorListComponent,
        UserListComponent,
        VolunteerListComponent,
        AddBlogComponent,
        AddUserComponent,
        EmployeeListComponent,
        EmployeeProfileComponent,
        StoryListComponent,
        SortableHeaderDirective,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "serverApp" }),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        NgxCaptchaModule,
        SlickCarouselModule,
        FilterPipeModule,
        AngularEditorModule,
        ChartsModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 8000,
            positionClass: "toast-top-center",
            preventDuplicates: true,
        }), // ToastrModule added
        NgbModule,
    ],
    providers: [Config, AppAuth, AppHttp, TableService, DecimalPipe, DatePipe, Meta],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {}
