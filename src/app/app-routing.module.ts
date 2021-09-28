import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { ForgetpasswordComponent } from "./pages/forgetpassword/forgetpassword.component";
import { LoginComponent } from "./pages/login/login.component";
import { RecreatepasswardComponent } from "./pages/recreatepassward/recreatepassward.component";
import { RegisterComponent } from "./pages/register/register.component";
import { environment } from "src/environments/environment";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuard } from './shared/auth.guard';
import { BlogsComponent } from "./pages/blogs/blogs.component";
import { StoriesComponent } from "./pages/stories/stories.component";
import { BlogDetailsComponent } from "./pages/blog-details/blog-details.component";
import { StoryDetailsComponent } from "./pages/story-details/story-details.component";
import { CompaignComponent } from './pages/compaign/compaign.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignDashboadComponent } from './pages/campaign-dashboad/campaign-dashboad.component';
import { RaahiSeoComponent } from './pages/raahi-seo/raahi-seo.component';
import { AutoLoginGuard } from "./shared/auto-login.guard";
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { DonorListComponent } from './pages/donor-list/donor-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { VolunteerListComponent } from './pages/volunteer-list/volunteer-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './pages/employee-profile/employee-profile.component';
import { StoryListComponent } from './pages/story-list/story-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "blogs",
    component: BlogsComponent,
    data: {
      seo: {
        title: "RAAHI - Blogs",
        metaTags: [
          {
            name: "description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI - Medical Cases" },
          { property: "og:site_name", content: environment.PgcUrl + "" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          {
            proprety: "og:description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "Blogs" },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI - Medical Cases" },
        ],
      },
    },
  },
  {
    path: "blogs/:blogslug",
    component: BlogDetailsComponent,
    data: {
      seo: {
        title: "6 yrs old kid needs your support to walk properly, Please Help!",
        metaTags: [
          {
            name: "description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          {
            name: "keywords",
            content:
              "Sponsor a child, Life changing surgery, social sponsorship, donate to save life, Medical mission, sponsor medical expenses, donate to best npo, RAAHI, humanity welfare council, urgent medical support",
          },
          { property: "og:title", content: "6 yrs old kid needs your support to walk properly, Please Help!" },
          { property: "og:site_name", content: environment.PgcUrl + "mousam" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          {
            proprety: "og:description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          { property: "og:image", content: environment.PgcUrl + "assets/img/cases/case13.png" },
          { property: "og:url", content: environment.PgcUrl + "mousam" },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/cases/case13.png" },
          { name: "twitter:title", content: "6 yrs old kid needs your support to walk properly, Please Help!" },
        ],
      },
    },
  },
  {
    path: "cases",
    component: StoriesComponent,
    data: {
      seo: {
        title: "RAAHI - Cases",
        metaTags: [
          {
            name: "description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI - Medical Cases" },
          { property: "og:site_name", content: environment.PgcUrl + "" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          {
            proprety: "og:description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "Stories" },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:description",
            content: "RAAHI is raising funds all over India for supporting people during medical emergencies and the one who loose their sole earning member of the family.",
          },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI - Medical Cases" },
        ],
      },
    },
  },
  {
    path: "cases/:storyslug",
    component: StoryDetailsComponent,
    data: {
      seo: {
        title: "6 yrs old kid needs your support to walk properly, Please Help!",
        metaTags: [
          {
            name: "description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          {
            name: "keywords",
            content:
              "Sponsor a child, Life changing surgery, social sponsorship, donate to save life, Medical mission, sponsor medical expenses, donate to best npo, RAAHI, humanity welfare council, urgent medical support",
          },
          { property: "og:title", content: "6 yrs old kid needs your support to walk properly, Please Help!" },
          { property: "og:site_name", content: environment.PgcUrl + "mousam" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          {
            proprety: "og:description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          { property: "og:image", content: environment.PgcUrl + "assets/img/cases/case13.png" },
          { property: "og:url", content: environment.PgcUrl + "mousam" },
          { name: "twitter:card", content: "summary_large_image" },
          {
            name: "twitter:description",
            content: "Mousam is six years old, and his struggle is continuing, and his challenges are increasing day by day. Mousam has a tumour in his leg, which is growing slowly.",
          },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/cases/case13.png" },
          { name: "twitter:title", content: "6 yrs old kid needs your support to walk properly, Please Help!" },
        ],
      },
    },
  },
  {
    path: "recreatepassward",
    component: RecreatepasswardComponent,
    data: {
      seo: {
        title: "RAAHI | recreatepassward",
        metaTags: [
          { name: "description", content: "recreatepassward" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | recreatepassward" },
          { property: "og:site_name", content: environment.PgcUrl + "recreatepassward" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "recreatepassward" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "recreatepassward" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "recreatepassward" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | recreatepassward" },
        ],
      },
    },
  },
  {
    path: "forgetpassword",
    component: ForgetpasswordComponent,
    data: {
      seo: {
        title: "RAAHI | forgetpassword",
        metaTags: [
          { name: "description", content: "forgetpassword" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | forgetpassword" },
          { property: "og:site_name", content: environment.PgcUrl + "events" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "forgetpassword" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "forgetpassword" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "forgetpassword" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | forgetpassword" },
        ],
      },
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AutoLoginGuard],
    data: {
      seo: {
        title: "RAAHI | register",
        metaTags: [
          { name: "description", content: "register" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | register" },
          { property: "og:site_name", content: environment.PgcUrl + "register" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "register" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "register" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "register" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | register" },
        ],
      },
    },
  },
  {
    path: "login",
    pathMatch: "prefix",
    component: LoginComponent,
    canActivate: [AutoLoginGuard],
    data: {
      seo: {
        title: "RAAHI | Login",
        metaTags: [
          { name: "description", content: "RAAHI Login" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | Login" },
          { property: "og:site_name", content: environment.PgcUrl + "login" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "Login" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "login" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "Login" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | Login" },
        ],
      },
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      seo: {
        title: "RAAHI | Dashboard",
        metaTags: [
          { name: "description", content: "RAAHI Dashboard" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | dashboard" },
          { property: "og:site_name", content: environment.PgcUrl + "login" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "dashboard" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "dashboard" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "dashboard" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | dashboard" },
        ],
      },
    },
  },
  {
    path: "compaign",
    component: CompaignComponent,
    canActivate: [AuthGuard],
    data: {
      seo: {
        title: "RAAHI | compaign",
        metaTags: [
          { name: "description", content: "RAAHI compaign" },
          {
            name: "keywords",
            content:
              "free medical aid, free medical aid near me, gift donations, volunteer hospital near me, gift donations, health volunteer opportunities, sponsor medical treatment for poor, sponsor medical treatment for poor in india, RAAHI",
          },
          { property: "og:title", content: "RAAHI | compaign" },
          { property: "og:site_name", content: environment.PgcUrl + "login" },
          { property: "og:type", content: "article" },
          { property: "fb:pages", content: "112162960243834" },
          { proprety: "og:description", content: "compaign" },
          { property: "og:image", content: environment.PgcUrl + "assets/img/og.jpg" },
          { property: "og:url", content: environment.PgcUrl + "compaign" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:description", content: "compaign" },
          { name: "twitter:image:src", content: environment.PgcUrl + "assets/img/og.jpg" },
          { name: "twitter:title", content: "RAAHI | compaign" },
        ],
      },
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campaign-list',
    component: CampaignListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'campaign-dashboard',
    component: CampaignDashboadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard-seo',
    component: RaahiSeoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog-list',
    component: BlogListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'donor-list',
    component: DonorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'volunteer-list',
    component: VolunteerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'emp-list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'story-list',
    component: StoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "enabled",
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
