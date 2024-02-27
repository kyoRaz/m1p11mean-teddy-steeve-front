import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriqueService } from 'src/app/services/historique/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
})
export class HistoriqueComponent {
  formData: any = {}
  historique: any = [];
  displayedColumns: string[] = ['num', 'dateRDV', 'etat', 'action'];
  total: number = 0;
  totalPages: number = 0;
  page: number = 1;
  size: number = 10;

  constructor(private histoService: HistoriqueService) { }

  ngOnInit() {
    this.filtreHistorique(null);

  }


  onSubmit(formData: any) {
    console.log(formData);
    let data = {
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
    }
    this.filtreHistorique(data);
  }


  onPageChange(pageEvent: any): void {
    this.page = pageEvent.pageIndex + 1;
    this.size = pageEvent.pageSize;
    // this.loadData();
  }

  filtreHistorique(data: any | undefined) {
    this.histoService.getHistorique(data).subscribe(
      (response) => {
        this.historique = response.resultat;
        this.size = response.size;
        console.log("🚀 ~ HistoriqueComponent ~ onSubmit ~ response:", response);
        // this.getListPreference();
      },
      (error) => {
        alert('Erreur: ' + error.message);
      }
    );
  }




}
