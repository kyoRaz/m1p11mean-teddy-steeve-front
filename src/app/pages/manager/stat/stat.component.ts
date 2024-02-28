import { Component } from '@angular/core';

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
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent {

  chartOptions: Partial<ChartOptions> | any;
  chartOptionNbReservationParJour: Partial<ChartOptions> | any;
  chartOptionNbReservationParMois: Partial<ChartOptions> | any;
  chartOptionBenefice: Partial<ChartOptions> | any;
  statData: any = {};
  statDataNbReservationParJour: any = {};
  statDataNbReservationParMois: any = {};
  statBenefice: any = {};
  show = false;
  showNbReservationParJour = false;
  showNbReservationParMois = false;
  showBenefice = false;

  constructor(private statService: StatService) { }

  generateColors(numberOfColors: number): string[] {
    let colors: string[] = [];

    for (let i = 0; i < numberOfColors; i++) {
      // Calculer la teinte - diviser le cercle de couleur en parts égales
      const hue = i * (360 / numberOfColors);
      const color = `hsl(${hue}, 100%, 50%)`; // S et L fixés pour simplicité
      colors.push(color);
    }

    return colors;
  }

  ngOnInit(): void {


    this.getReservationJour();
    this.getStatNbReservationParMois();
    this.getStat();
    this.getStatBenefice();
  }


  async getStat() {
    this.statService.getStatSemaineAll().subscribe(
      (response: any) => {
        this.statData = response.resultat;
        this.show = true;
        this.chartOptions = this.initiateChart(this.statData.data ?? [], this.statData.labels ?? []);
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  async getReservationJour() {
    this.statService.getReservationJour().subscribe(
      (response: any) => {
        this.statDataNbReservationParJour = response.resultat;
        // console.log("🚀 ~ StatComponent ~ getReservationJour ~ this.statData:", this.statDataNbReservationParJour)
        this.showNbReservationParJour = true;
        this.chartOptionNbReservationParJour = this.initiateChartNbReservationParJour(this.statDataNbReservationParJour.data ?? [], this.statDataNbReservationParJour.labels ?? []);
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  async getStatNbReservationParMois() {
    this.statService.getReservationMois().subscribe(
      (response: any) => {
        this.statDataNbReservationParMois = response.resultat;
        // console.log("🚀 ~ StatComponent ~ getReservationMois ~ this.statData:", this.statDataNbReservationParMois)
        this.showNbReservationParMois = true;
        this.chartOptionNbReservationParMois = this.initiateChartNbReservationParMois(this.statDataNbReservationParMois.data ?? [], this.statDataNbReservationParMois.labels ?? []);
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  async getStatBenefice() {
    this.statService.getBeneficeStat().subscribe(
      (response: any) => {
        this.statBenefice = response.resultat;
        console.log("🚀 ~ StatComponent ~ getBenefice ~ this.stat:", this.statBenefice.data)
        this.showBenefice = true;
        this.chartOptionBenefice = this.initiateChartBenefice(this.statBenefice.data ?? [], this.statBenefice.labels ?? []);
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  initiateChart(valeur: any, libelle: any) {
    const numberOfSeries = valeur?.length ? valeur?.length : 0;
    const colors = this.generateColors(numberOfSeries);
    return {
      series: valeur || [],
      colors: colors,
      chart: {
        height: 350,
        type: "line"
      },
      xaxis: {
        categories: libelle,
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
      },
      legend: {
        show: false
      }
    };
  }

  initiateChartNbReservationParJour(valeur: any, libelle: any) {

    var options = {
      series: [{
        name: 'Journalier',
        data: valeur
      }],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: libelle,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        }

      },
      title: {
        text: 'Nombre de réservation par jour',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };
    return options;

  }

  initiateChartNbReservationParMois(valeur: any, libelle: any) {

    var options = {
      series: [{
        name: 'reservation',
        data: valeur
      }],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: libelle,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        }

      },
      title: {
        text: 'Nombre de réservation par mois',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };
    return options;

  }

  initiateChartBenefice(valeur: any, libelle: any) {

    var options = {
      series: valeur,
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: libelle,
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        // y: {
        //   formatter: function (val) {
        //     return "$ " + val + " thousands"
        //   }
        // }
      }
    };
    return options;

  }


}
