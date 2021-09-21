import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, SlickCarouselModule, ReactiveFormsModule, FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
