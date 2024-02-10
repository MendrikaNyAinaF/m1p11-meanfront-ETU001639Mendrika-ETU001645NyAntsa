import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/personne/client.service';
import { EmployeeService } from 'src/app/services/personne/employee.service';
import { ManagerService } from 'src/app/services/personne/manager.service';
import { PersonneService } from 'src/app/services/personne/personne.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  personneService: any;

  constructor(private managerService: ManagerService, 
    private employeeService: EmployeeService,
    private clientService: ClientService ) { }

  ngOnInit(): void {
    var loginInputs:any ={
      username: {
        type: 'email',
        label: 'email',
        validators: [Validators.required,Validators.email],
      },
      password: {
        type: 'password',
        label: 'Password',
        validators: [Validators.required],
      }
    }
  }

  handleLoginForm(data:any){
    console.log(data);
    return this.personneService.login(data);
  }
}
