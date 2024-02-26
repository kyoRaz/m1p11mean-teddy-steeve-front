import { Component } from '@angular/core';

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

import { StatService } from 'src/app/services/stat/stat.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent {

  chartOptions: Partial<ChartOptions> | any;

  constructor(private statService: StatService) { }


  ngOnInit(): void {


    let couleur = ['Rouge', 'Vert']
    let nb = [1, 15]
    this.chartOptions = this.initiateChart(nb, couleur)

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
