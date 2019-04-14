import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee = {
    id: 0,
    name: '',
    empId: '',
    designation: '',
    age: 0,
    isDeleted: false
  };

  successMessage = '';

  cols = [
    { field: 'empId', header: 'Emp Id' },
    { field: 'name', header: 'Name' },
    { field: 'designation', header: 'Designation' },
    { field: 'age', header: 'age' }
  ];

  loadedEmployees = [];
  employeeData = [];
  employeeChartData: any;
  loading: boolean;
  totalRecords: any;
  tableEvent: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.loadedEmployees = this.employeeService.getEmployee().filter(e => !e.isDeleted);
    this.totalRecords = this.loadedEmployees.length;
    this.updateChartData();
    this.loadCarsLazy(this.tableEvent);
  }

  loadCarsLazy(event: any) {
    this.loading = true;
    this.tableEvent = event;

    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      if (this.loadedEmployees) {
        this.employeeData = this.loadedEmployees.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 500);
  }

  updateChartData() {
    const activeEmployeeCount = this.employeeService.getEmployee().filter(e => !e.isDeleted).length;
    const deletedEmployeeCount = this.employeeService.getEmployee().filter(e => e.isDeleted).length;
    this.employeeChartData = {
      labels: ['Active Employees', 'Deleted Employees'],
      datasets: [
        {
          data: [activeEmployeeCount, deletedEmployeeCount],
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
          ],
          hoverBackgroundColor: [
            '#36A2EB',
            '#FF6384',
          ]
        }]
    };
  }

  onSubmit() {
    if (this.employee.id === 0) {
      this.post();
    } else {
      this.put();
    }
    this.getEmployees();
    console.log('employees', this.employeeService.getEmployee());
  }

  post() {
    this.employee.id = this.employeeData.length + 1;
    this.employeeService.addEmployee(this.employee);
    this.reset();
    this.successMessage = 'Employee added successfully.';
  }

  put() {
    this.employeeService.updateEmployee(this.employee);
    this.reset();
    this.successMessage = 'Employee updated successfully.';
  }

  edit(employee) {
    this.successMessage = '';
    this.employee = {
      id: employee.id,
      name: employee.name,
      empId: employee.empId,
      designation: employee.designation,
      age: employee.age,
      isDeleted: false
    };
  }

  delete(employeeId) {
    this.employeeService.deleteEmploye(employeeId);
    this.successMessage = 'Employee delete successfully.';
    this.getEmployees();
  }

  reset() {
    this.employee = {
      id: 0,
      name: '',
      empId: '',
      designation: '',
      age: 0,
      isDeleted: false
    };
  }

}
