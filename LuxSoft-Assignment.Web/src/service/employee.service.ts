import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: any = [];
  constructor() { }

  addEmployee(employeeObj) {
    this.employees.push(employeeObj);
  }

  updateEmployee(employeeObj) {
    const index = this.employees.map(x => x.id).indexOf(employeeObj.id);
    this.employees[index] = employeeObj;
  }

  getEmployee() {
    return this.employees;
  }

  deleteEmploye(id) {
    const index = this.employees.map(x => x.id).indexOf(id);
    this.employees[index].isDeleted = true;
  }

}
