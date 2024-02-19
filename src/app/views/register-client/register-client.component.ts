import {Component, NgModule, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenderService} from "../../services/gender/gender.service";
import {Gender} from "../../model/gender";
import {ImgurService} from "../../services/imgur/imgur.service";
import {RegisterService} from "../../services/client/register.service";

@Component({
    selector: 'app-register-client',
    templateUrl: './register-client.component.html',
    styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
    registrationForm: FormGroup;
    hide = true;
    genders: Gender[] = [];
    selectedFile: string = '';
    success: any;
    message: any;

    constructor(private fb: FormBuilder, private genderService: GenderService, private imgurService: ImgurService, private registerService: RegisterService) {
        this.registrationForm = this.fb.group({
            firstName: [''],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]*$')]],
            birthdate: ['', Validators.required],
            gender: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        console.log('RegisterClientComponent');
        this.genderService.findAll().then((res: any) => {
                console.log(res)
                this.genders = res;
            }
        );
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            console.log('Form submitted:', this.registrationForm.value);
            let password = this.registrationForm.get('password')?.value;
            let gender = {
                "_id": {
                    "$oid": this.registrationForm.get('gender')?.value
                }
            };
            let type = {
                "_id": {
                    "$oid": "65c220b43fe8b2bd4b8f7d79"
                }
            }

            let response = null

            let client = {
                prenom: this.registrationForm.get('firstName')?.value,
                nom: this.registrationForm.get('lastName')?.value,
                genre: gender,
                email: this.registrationForm.get('email')?.value,
                telephone: this.registrationForm.get('phone')?.value,
                date_naissance: this.registrationForm.get('birthdate')?.value,
                type: type,
                password: password,
                photo: ""
            }

            response = this.imgurService.uploadImage(this.selectedFile?.split(',')[1] as string);
            response.then(response => {
                console.log('Fetch response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
                .then(result => {
                    console.log('Fetch successful:', result);
                    // Handle the result as needed
                    client.photo = result.data.link;
                    console.log(client, JSON.stringify(client));
                    this.registerService.register(client).subscribe((res: any) => {
                            console.log(res);
                            //     check if the response is successful
                            if (res.code === 200) {
                                this.success = true;
                                this.message = "Votre compte a été créé avec succès";
                            } else {
                                this.success = false;
                                this.message = "Erreur lors de la création de votre compte";
                            }
                        }
                    );
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Handle the error as needed
                    client.photo = this.selectedFile
                    console.log(client, JSON.stringify(client));
                    this.registerService.register(client).subscribe((res: any) => {
                            console.log(res);
                            //     check if the response is successful
                            if (res.code === 200) {
                                this.success = true;
                                this.message = "Votre compte a été créé avec succès";
                            } else {
                                this.success = false;
                                this.message = "Erreur lors de la création de votre compte";
                            }
                        }
                    );
                });
        }
    }

    togglePasswordVisibility() {
        this.hide = !this.hide;
    }


    selectFile(event: Event) {
        const element = event.target as HTMLInputElement;
        const file = element.files?.item(0);
        if (file) {
            console.log('Selected file:', file);
            let filename = file.name;
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                console.log('Base64 string:', base64String);
                // take only the base64 string after the comma
                // const base64StringWithoutHeader = base64String.split(',')[1];
                this.selectedFile = base64String;
                // You can use the base64String as needed (e.g., save it in a variable or send it to a server)
            };

            reader.readAsDataURL(file);
        }
    }
}
