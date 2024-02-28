import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoriqueService } from 'src/app/services/historique/historique.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { LoaderService } from "../../../../services/loader/loader.service";

@Component({
  selector: 'app-suivitache',
  templateUrl: './suivitache.component.html',
  styleUrls: ['./suivitache.component.scss']
})
export class SuivitacheComponent {

  listDone = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['num', 'service', 'dateRDV', 'horaire', 'çommission'];
  total: number = 0;
  totalPages: number = 0;
  page: number = 1;
  size: number = 10;
  idUser: string

  constructor(private histoService: HistoriqueService,
    private localStorageService: LocalStorageService,
    public loader: LoaderService) { }


  ngOnInit() {
    let jsonString = this.localStorageService.getData("user");
    let user = JSON.parse(jsonString);
    this.idUser = user._id;
    let data = {
      size: this.size,
      page: this.page,
      idUser: this.idUser
    }
    this.loadData(data);

  }


  onSubmit(formData: any) {
    console.log("🚀 ~ SuivitacheComponent ~ onSubmit ~ formData:", formData)
    let data = {
      size: this.size,
      page: this.page,
      idUser: this.idUser,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin
    }
    this.loadData(data);
  }

  loadData(data: any) {
    this.histoService.getSuiviDone(data).subscribe(
      (response: any) => {
        console.log("🚀 ~ SuivitacheComponent ~ loadData ~ response:", response);
        this.listDone = response.data;
        this.total = response.totalPages;
        this.page = response.currentPage;
        this.size = response.pageSize;
      },
      (error) => {
        // alert('Erreur: ' + error.message);
      }
    );
  }

}
