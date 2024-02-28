import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmitProps } from 'src/app/components/interfaces';
import { ClientService } from 'src/app/services/personne/client.service';
import { EmployeeService } from 'src/app/services/personne/employee.service';
import { ManagerService } from 'src/app/services/personne/manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  personneService: any;
  loginInputs: any;
  loginBtnProps: SubmitProps = {
    label: 'Se connecter',
    submit: function (data: any) {
    },
    color: 'primary',
    class:'full-width',
  };
  loginRole: string= 'manager';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private managerService: ManagerService,
    private employeeService: EmployeeService,
    private clientService: ClientService,
  ) {

  }


  ngOnInit(): void {
    /* prendre le type de login */
    this.loginRole = this.route.snapshot.params["person"];

    /* mettre en place les services et les redirect */
    this.personneService = {
      manager: {
        service: this.managerService,
        redirect: '/manager/services',
        title: 'Manager login'
      },
      client: {
        service: this.clientService,
        redirect: '/client/appointment',
        title: 'Client login'
      },
      employee: {
        service: this.employeeService,
        redirect: '/employee/profil',
        title: 'Employee login'
      }
    };
    const defaultLogin= this.personneService[this.loginRole].service.getDefaultLogin();
    /* mettre en place les inputs du login */
    this.loginInputs = {
      email: {
        type: 'email',
        label: 'Email',
        default:defaultLogin.email,
        validators: [Validators.required, Validators.email],
      },
      password: {
        type: 'password',
        label: 'Mot de passe',
        default:defaultLogin.password,
        validators: [Validators.required],
      }
    }
    this.loginBtnProps.submit = (data: any) => {
      return this.personneService[this.loginRole].service.login(data);
    }
  }

  actualLogin(){
    return this.personneService[this.loginRole];
  }

  handleSubmitChange(event: string) {
    if (event === 'success') {
      console.log("success");
      if(this.loginRole=="employee") window.location.href=this.personneService[this.loginRole].redirect;
      else this.router.navigate([this.personneService[this.loginRole].redirect]);
    }
  }

}
