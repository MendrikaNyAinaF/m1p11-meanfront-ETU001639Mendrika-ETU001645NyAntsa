import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/components/interfaces';
import { EmployeeService } from 'src/app/services/personne/employee.service';

@Component({
  selector: 'app-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.scss']
})
export class EmployeeProfilComponent implements OnInit {
  id!:string;
  employee:any;
  foundEmp=true;
  loader=false;

  scheduleColumns:Column[]=[
    {
      name:"Heure de début",
      selector:(row:any)=>row.heure_debut,
    },
    {
      name:"Heure de fin",
      selector:(row:any)=>row.heure_fin,
    },
    {
      name:"Plage de date de mise en application",
      selector:(row:any)=> row.date_debut+" à "+row.date_fin
    }
  ]

  constructor(private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.employee={
      "nom":"Jerry",
      "prenom":"Chrome",
      "genre":"fille",
      email:"test@gmail.com",
      telephone: "02035190431",
      date_naissance: "2025-01-24",
      photo:"",
      horaires:[]
    }
    return;
    this.loader=true;
    this.employeeService.getConnectedUser().then((data:any)=>{
      this.employee = data;
      this.foundEmp=true;
      this.loader=false;
    }).catch((error:any)=>{
        console.error(error);
        this.foundEmp=false;
        this.loader=false;
    });
  }
}
