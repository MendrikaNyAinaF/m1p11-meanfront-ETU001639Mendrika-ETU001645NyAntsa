import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SubmitProps } from 'src/app/components/interfaces';
import { ManagerService } from 'src/app/services/personne/manager.service';

@Component({
  selector: 'app-manager-profil',
  templateUrl: './manager-profil.component.html',
  styleUrls: ['./manager-profil.component.scss']
})
export class ManagerProfilComponent implements OnInit {
  manager!: any;
  foundClient = true;
  isHere: boolean = false;

  inputs!: any;
  profilBtnProps!: SubmitProps;


  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getClient();
  }
  getClient = () => {
    this.managerService.getConnectedUser().then((data: any) => {
      // console.log(data);
      this.manager = (data && data.length > 0) ? data[0] : data;
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
        return this.managerService.update(data);
      },
      color: 'primary',
    }
    this.inputs = {
      nom: {
        label: "Nom",
        type: "text",
        default: this.manager.nom,
        validators: Validators.required,
        class: "w-100 fs-16"
      },
      prenom: {
        label: "Prénom",
        type: "text",
        default: this.manager.prenom,
        validators: Validators.required,
        class: "w-100 fs-16"
      },
      email: {
        label: "Email",
        type: "email",
        default: this.manager.email,
        validators: [Validators.required, Validators.email],
        class: "w-100 fs-16"
      },
      telephone: {
        label: "Téléphone",
        type: "text",
        default: this.manager.telephone,
        class: "w-100 fs-16"
      }
    }
  }
  handleSubmitChange(event: string) {
    if (event === 'success') {
      this.getClient();
    }
  }
}
