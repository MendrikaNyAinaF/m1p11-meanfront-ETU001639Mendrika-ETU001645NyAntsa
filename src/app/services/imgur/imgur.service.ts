import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ImgurService {

    constructor(private httpClient: HttpClient) {
    }

    uploadImage(base64Image: string) {
        const headers = new Headers({
            "Authorization": "Client-ID " + environment.imgurClientId,
            "Content-Type": "application/json"
        });

        const data = {
            "image": base64Image
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        return fetch(environment.imgurUploadUrl, requestOptions)
    }
}
