import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SubmitProps } from 'src/app/components/interfaces';
import { ClientService } from 'src/app/services/personne/client.service';

@Component({
  selector: 'app-client-profil',
  templateUrl: './client-profil.component.html',
  styleUrls: ['./client-profil.component.scss']
})
export class ClientProfilComponent implements OnInit {
  client!: any;
  foundClient = true;
  isHere: boolean = false;

  inputs!: any;
  profilBtnProps!: SubmitProps;


  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient = () => {
    this.clientService.getConnectedUser().then((data: any) => {
      console.log(data[0]);
      this.client = (data && data.length > 0) ? data[0] : {};
      this.foundClient = true;
      this.isHere = true;
      this.buildForm();
    }).catch((error: any) => {
      console.error(error);
      this.foundClient = false;
      this.isHere = true;
    });
  }

  buildForm() {
    this.profilBtnProps = {
      label: 'Modifier les informations',
      submit: (data: any) => {
        return this.clientService.update(data);
      },
      color: 'primary',
    }
    this.inputs = {
      nom: {
        label: "Nom",
        type: "text",
        default: this.client.nom,
        validators: Validators.required,
        class: "w-100 fs-16"
      },
      prenom: {
        label: "Prénom",
        type: "text",
        default: this.client.prenom,
        validators: Validators.required,
        class: "w-100 fs-16"
      },
      email: {
        label: "Email",
        type: "email",
        default: this.client.email,
        validators: [Validators.required, Validators.email],
        class: "w-100 fs-16"
      },
      telephone: {
        label: "Téléphone",
        type: "text",
        default: this.client.telephone,
        validators: Validators.required,
        class: "w-100 fs-16"
      },
      date_naissance: {
        label: "Date de naissance",
        type: "date",
        default: this.client.date_naissance,
        class: "w-100 fs-16"
      },
      photo: {
        label: "Photo",
        type: "image",
        default: this.client.photo,
        class: "w-100 fs-16"
      },
    }
  }
  handleSubmitChange(event: string) {
    if (event === 'success') {
      this.getClient();
    }
  }
}
