import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppAuth } from "../../services/app-auth.service";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  storyForm: FormGroup;
  step: number = 1;
  errStep1: boolean = false;
  errStep2: boolean = false;
  submitting: boolean = false;

  constructor(public formBuilder: FormBuilder, public toastr: ToastrService, public auth: AppAuth) { }

  ngOnInit(): void {
    this.storyForm = this.formBuilder.group(
            {
                title: ["", Validators.required],
                body: ["", Validators.required],
                file: [""],
               
            },
          );
  }
  get f() {
        return this.storyForm.controls;
  }
  storySubmit() {
        this.submitting = true;

        if (this.storyForm.valid) {
           let u = this.storyForm.value;
            this.auth.register(u).then(
                (data) => {
                    this.toastr.success(data.message);
                    this.storyForm.reset();
                    this.submitting = false;
                },
                (err) => {
                    this.toastr.error(err.title, err.detail);
                    this.submitting = false;
                }
            );
        }
        else {
            this.errStep2 = true;
        }
    }

    validateStep1() {
        let c = this.storyForm.controls;
        console.log(c);
        
        if (c.title.valid) {
            this.errStep1 = false; // no errors should display
            this.step = 2;
        }
        else {
            this.errStep1 = true // display step 1 errors
        }
    }

    validateStep2() {
        let c = this.storyForm.controls;
        console.log(c);
        
        if (c.title.valid) {
            this.errStep2 = false; // no errors should display
            this.step = 3;
        }
        else {
            this.errStep2 = true // display step 1 errors
        }
    }

    next() {
        if (this.step == 1) {
            this.validateStep1();
        }
        else if (this.step == 2) {
            this.validateStep2();
        }
    }

    previous() {
        if(this.step > 1) {
            this.step--;
        }
    }
  tables = [
  {
    c_name:"Business Tech Event",
    c_type:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
  },
  {
    c_name:"Business Tech Event",
    c_type:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
  },
  {
    c_name:"Business Tech Event",
    c_type:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
  },
  {
    c_name:"Business Tech Event",
    c_type:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
  },

  ]


}
