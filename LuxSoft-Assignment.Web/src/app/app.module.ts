import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { EmployeeService } from 'src/service/employee.service';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    TabViewModule,
    ChartModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
