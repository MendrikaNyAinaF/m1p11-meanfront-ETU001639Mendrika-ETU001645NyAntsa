import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/components/interfaces';
import { EmployeeService as EmpService } from 'src/app/services/personne/employee.service';
import { EmployeeService as EmpCrud } from 'src/app/services/employee/employee.service';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.scss']
})
export class EmployeeProfilComponent implements OnInit {
  employee: any;
  foundEmp = true;

  scheduleColumns: Column[] = [
    {
      name: "Heure de début",
      selector: (row: any) => row.heure_debut,
    },
    {
      name: "Heure de fin",
      selector: (row: any) => row.heure_fin,
    },
    {
      name: "Plage de date de mise en application",
      selector: (row: any) => row.date_debut + " à " + row.date_fin
    }
  ]

  constructor(
    private employeeService: EmpService,
    private employeeCrud: EmpCrud,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    const id = this.storageService.getCurrentUserInfo().id;
    this.employeeCrud.findOne(id).then((data: any) => {
      console.log(data.data)
      this.employee = data.data.length > 0 ? data.data[0] : data.data;
      this.foundEmp = true;
      this.getSchedule();
    }).catch((error: any) => {
      console.error(error);
      this.foundEmp = false;
    });
  }
  getSchedule() {
    this.employeeService.findCurrentSchedule().then((data: any) => {
      console.log(data)
      if (data.data && data.data.length > 0)
        this.employee.horaires = [data.data];
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
