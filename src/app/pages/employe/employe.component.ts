import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  // styleUrls: ['./employe.component.scss']
})
export class EmployeComponent {

  formData: any = {};
  user: any = {};
  horaire: any = {};
  servicename: string = "users";
  idUser: string = "65bf662353006be666fda322"
  chartOptions: Partial<ChartOptions> | any;
  
  constructor(private httpService: HttpService) {
    this.chartOptions = {
      series: [
        {
          name: "Heure  Moyenne",
          data: [10, 41, 35, 51, 49, 62, 69]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      xaxis: {
        categories: [
          "Lundi", "Mardi", "Mercredi", "Jeud", "Vendredi", "Samedi", "Dimanche"
        ]
      },
      stroke: {
        curve: "smooth"
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        opposite: false
      },
      tooltip: {
        enabled: true
      }
    };
    
  }

  ngOnInit(): void {
    this.httpService.getOne(this.servicename, this.idUser).subscribe(response => {
      this.user = response;
    });
    this.httpService.getOne("horaires/employe", this.idUser).subscribe(response => {
      this.horaire = response.result;
      console.log(this.horaire);
    });
  }

  async onSubmit(formData: any) {
    let url = "beauty/" + this.servicename + "/" + this.idUser;

    (await this.httpService.putData(url, formData)).subscribe(
      (response: any) => {
        alert("Success");
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  setFormData(formData: any){
    this.formData= formData;
  }


  async updateHoraire() {
    let url = "beauty/horaires/" + this.horaire._id;
    (await this.httpService.putData(url, this.formData)).subscribe(
      (response: any) => {
        alert("Success");
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }


}
