import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RdvService } from 'src/app/services/rdv/rdv.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
})
export class RdvComponent {

  rdv: any = {}
  listRdvDet: any = []
  total: any
  id: string | null = ""
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rdvService: RdvService,
    public loader: LoaderService,
    public sweet: AlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        console.log(`L'this.id du livre est ${this.id}`);
        this.getRdv(this.id);
        this.getDetails(this.id);
        // Ici, vous pouvez appeler une fonction pour charger les détails du livre à partir de l'ID
      } else {
        // Gérer le cas où l'ID n'est pas trouvé, par exemple en redirigeant
        this.router.navigate(['/']);
      }
    });
  }

  getRdv(id: any) {
    this.rdvService.getRDV(id).subscribe(
      (response) => {
        this.rdv = response.result;

      },
      (error) => {
        console.log('Erreur: ' + error.message);
      }
    );
  }

  getDetails(id: string) {
    this.rdvService.getListDetails(id).subscribe(
      (response: any) => {
        this.listRdvDet = response.result.list;
        this.total = response.result.total
      },
      (error) => {
        console.log('Erreur: ' + error.message);
      }
    );
  }

  payerRDV() {
    this.rdvService.payer(this.id).subscribe(
      (response) => {
        console.log("🚀 ~ HistoriqueComponent ~ onSubmit ~ response:", response);
        this.sweet.showSuccessAlert("payement effectué");
        this.getRdv(this.id);
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
        console.log('Erreur: ' + error.message);
      }
    );
  }


}
