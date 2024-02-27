import { Component } from '@angular/core';
import { StatService } from 'src/app/services/stat/stat.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent {

  listTypeDepense: any = [];
  formData: any = {};
  depense: any;
  depenses: any = [];
  displayedColumns: string[] = ['num', 'date', 'type', 'montant', 'description', 'action'];
  total: number = 0;
  totalPages: number = 0;
  page: number = 1;
  size: number = 10;
  filtre: string = '';

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.getListType();
    // this.getDepense();
    this.loadData();
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.statService.createDepense(formData).subscribe(
      (response: any) => {
        alert("Success");
        this.getDepense();
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  setDepense(dep: any) {
    this.depense = dep;
  }

  getListType() {
    this.statService.getTypeList().subscribe(
      (response: any) => {
        this.listTypeDepense = response.resultat;
        if (this.listTypeDepense.length > 0) {
          this.formData.idTypeDepense = this.listTypeDepense[0]._id;
        }
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  getDepense() {
    this.statService.getDepense().subscribe(
      (response: any) => {
        this.depenses = response.resultat;
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  onUpdate(formData: any) {
    this.statService.updateDepense(this.depense._id, formData).subscribe(
      (response: any) => {
        alert("Success");
        this.getDepense();
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  deleteDep() {
    this.statService.deleteDepense(this.depense._id).subscribe(
      (response: any) => {
        alert("Success");
        this.getDepense();
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  loadData() {
    let filtre = {
      page: this.page,
      pageSize: this.size
    }
    this.filtrer(filtre);
  }

  filtrer(formData: any) {
    this.statService.filtertDepense(formData).subscribe(
      (response: any) => {
        this.depenses = response.data;
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite : " + error.message);
      }
    );
  }

  onPageChange(pageEvent: any): void {
    this.page = pageEvent.pageIndex + 1;
    this.size = pageEvent.pageSize;
    this.loadData();
  }




}
