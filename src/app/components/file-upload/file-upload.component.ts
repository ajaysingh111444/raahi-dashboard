import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Config } from "src/app/services/config";

@Component({
    selector: "file-upload",
    templateUrl: "./file-upload.component.html",
    styleUrls: ["./file-upload.component.css"],
})
export class FileUpload {
    
    @Input() requiredFileType: string;
    @Input() label: string;
    @Output() fileSelected = new EventEmitter();
    
    fileSrc: string | ArrayBuffer;
    
    constructor(public config: Config) {
    }

    handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        
        if(this.requiredFileType.includes('image/*')) {
            var pattern = /image-*/;
            var reader = new FileReader();
    
            if (!file.type.match(pattern)) {
                alert('invalid format');
                return;
            }
    
            reader.onload = (e) => {
                let reader = e.target;
                this.fileSrc = reader.result;
                file['base64url'] = this.fileSrc;

                this.fileSelected.emit(file);
            }
    
            reader.readAsDataURL(file);
        }
        else {
            this.fileSelected.emit(file);
        }
    }
}
