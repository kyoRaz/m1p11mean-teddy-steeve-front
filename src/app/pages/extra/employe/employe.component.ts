import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpService } from 'src/app/services/http/http.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { StatService } from 'src/app/services/stat/stat.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
})
export class EmployeComponent {

  formData: any = {};
  user: any = {};
  horaire: any = {};
  servicename: string = "users";
  idUser: string = "65bf7f78652c514a5a9bf7d4"
  chartOptions: Partial<ChartOptions> | any;
  statData: any = {};
  show = false;

  constructor(private httpService: HttpService, private statService: StatService) {

  }

  ngOnInit(): void {
    this.httpService.getOne(this.servicename, this.idUser).subscribe(response => {
      this.user = response;
    });
    this.httpService.getOne("horaires/employe", this.idUser).subscribe(response => {
      this.horaire = response.result;
    });

    this.getStat();

  }

  async onSubmit(formData: any) {
    let url = this.servicename + "/" + this.idUser;

    (await this.httpService.putData(url, formData)).subscribe(
      (response: any) => {
        // alert("Success");
      },
      (error: any) => {
        console.error(error);
        // alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  setFormData(formData: any) {
    this.formData = formData;
  }

  async updateHoraire() {
    let url = "horaires/" + this.horaire._id;
    (await this.httpService.putData(url, this.formData)).subscribe(
      (response: any) => {
        // alert("Success");
      },
      (error: any) => {
        console.error(error);
        // alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  async getStat() {
    this.statService.getStatSemaine(this.idUser).subscribe(
      (response: any) => {
        this.statData = response.resultat;
        this.show = true;
        this.chartOptions = this.initiateChart(this.statData.data.tempsTravailHeure, this.statData.labels);
      },
      (error: any) => {
        console.error(error);
        // alert("Une erreur s'est produite : " + error.message);
      }
    );
  }


  initiateChart(valeur: any, libelle: any) {
    return {
      series: [
        {
          name: "Heure  Moyenne",
          data: valeur
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      xaxis: {
        categories: libelle
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

}
