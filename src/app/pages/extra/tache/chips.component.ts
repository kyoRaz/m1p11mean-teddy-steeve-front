import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpService } from 'src/app/services/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { elementAt } from 'rxjs';



@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent implements OnInit {

  todo: any;
  done: any;
  doneListDisabled = false;
  servicename = "rdvDetails/";
  commission = 0;
  allRDV: any;
  idemploye = '65bf7f78652c514a5a9bf7d4';
  stats = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];

  constructor(private httpservice: HttpService, public dialog: MatDialog
    , public loader: LoaderService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadAllRDV();
  }

  loadAllRDV() {
    let today = this.createFormattedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

    this.httpservice.get(this.servicename + `rdvEmployeTous?idEmploye=${this.idemploye}&date=${today}`).subscribe((data: any) => {
      if (data) {
        this.allRDV = data.resultat;

      }
    }, (error: any) => {
      console.error('An error has occured:', error);
    });
  }
  createFormattedDate(year: number, month: number, day: number): string {
    month = month + 1;
    // Ajoutez un zéro devant le mois et le jour si nécessaire
    const formattedMonth = month < 10 ? '0' + month : month.toString();
    const formattedDay = day < 10 ? '0' + day : day.toString();

    // Créez une chaîne de caractères dans le format "yyyy-MM-dd"
    const formattedDate = `${year}-${formattedMonth}-24`;

    return formattedDate;
  }
  loadData() {
    let today = this.createFormattedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

    this.httpservice.get(this.servicename + `rdvEmployeFiniEtNouveau?idEmploye=${this.idemploye}&date=${today}`).subscribe((data: any) => {
      if (data) {
        this.todo = data.nouveau;
        this.done = data.fini;

      }
    }, (error: any) => {
      console.error('An error has occured:', error);
    });
  }
  async changeEtat(idRdv: string) {
    (await this.httpservice.putData(this.servicename + 'terminer', idRdv)).subscribe((data: any) => {
      if (data) {
        this.done = data;
        for (let index = 0; index < this.done.length; index++) {
          const element = this.done[index];
          this.commission+=element.service.prix;
          
        }
      }
    }, (error: any) => {
      console.error('An error has occured:', error);
    });
  }

  drop(event: CdkDragDrop<any[]>, listname: string) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      return;
    }

  }
  disableDoneList() {
    this.doneListDisabled = true;
  }
}

