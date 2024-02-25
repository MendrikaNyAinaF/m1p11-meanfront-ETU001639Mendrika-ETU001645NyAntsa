import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-full-size-image-dialog',
    template: `
        <img [src]="imageUrl" alt="Full-size Image" style="width: auto;height: 75vh">
    `,
})
export class FullSizeImageDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public imageUrl: string) {
        console.log("Image Url : ",imageUrl);
    }

    ngOnInit(): void {
    }

}
