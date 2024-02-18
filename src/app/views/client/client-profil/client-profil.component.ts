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
  client:any;
  foundClient=true;
  loader=false;

  inputs:any={};
  profilBtnProps!:SubmitProps;


  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClient();
    this.profilBtnProps={
      label:'Modifier les informations',
      submit: (data:any)=>{
        return this.clientService.update(this.client._id, data);
      },
    }
    this.inputs={
      nom:{
        label:"Nom",
        inputType:"text",
        default:this.client.nom,
        validators:Validators.required
      },
      prenom:{
        label:"Prénom",
        inputType:"text",
        default:this.client.prenom,
        validators:Validators.required
      },
      email:{
        label:"Email",
        inputType:"email",
        default:this.client.email,
        validators:[Validators.required,Validators.email]
      },
      telephone:{
        label:"Téléphone",
        inputType:"text",
        default:this.client.telephone,
        validators:Validators.required
      },
      date_naissance:{
        label:"Date de naissance",
        inputType:"date",
        default:this.client.date_naissance,
      },
      photo:{
        label:"Photo",
        inputType:"image",
        default:this.client.photo,
      },
    }
  }

  getClient=()=>{
    this.client={
      "nom":"Jerry",
      "prenom":"Chrome",
      "genre":"fille",
      email:"test@gmail.com",
      telephone: "02035190431",
      date_naissance: "2025-01-24",
      photo:"",
    };
    this.loader=true;
    this.clientService.getConnectedUser().then((data:any)=>{
      this.client = data;
      this.foundClient=true;
      this.loader=false;
    }).catch((error:any)=>{
        console.error(error);
        this.foundClient=false;
        this.loader=false;
    });
  }

  handleSubmitChange(event: string) {
    if (event === 'success') {
      this.getClient();
    }

  }
}
