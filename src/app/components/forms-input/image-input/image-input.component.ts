import { Component, Input, OnInit } from '@angular/core';
import { InputCommon } from '../input-common.class';
import { InputProps } from '../../interfaces';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent extends InputCommon implements OnInit {

  @Input() props !: InputProps;

  ngOnInit() {
    this.form.get(this.key)?.setValue(undefined);
    if(this.default()) this.preview=this.props.default;
  }
  selectedImg?: File;
  selectedImgName: string = "";

  preview: string = "";
  imageInfo?: Observable<any>;


  selectImage(event: any): void {
    this.selectedImgName = "";
    this.selectedImg = event.target.files[0];

    this.preview = "";
    if (this.selectedImg) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // console.log("base64: ",e.target.result);
        this.preview = (e.target.result);
        console.log("selectedImgName: ", this.preview);
        this.form.patchValue({
          [this.key]: this.preview
        });
      };

      reader.readAsDataURL(this.selectedImg);

      this.selectedImgName = this.selectedImg.name;
      console.log("selectedImgName: ", this.preview);
    }
  }
  default() {
    if (this.props.default != null && this.props.default != undefined && this.props.default != "")
      return true;
    return false;
  }
}
