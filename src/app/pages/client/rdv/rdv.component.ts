import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RdvService } from 'src/app/services/rdv/rdv.service';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
})
export class RdvComponent {

  rdv: any = {}
  listRdvDet: any = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rdvService: RdvService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        console.log(`L'ID du livre est ${id}`);
        this.getRdv(id);
        this.getDetails(id);
        // Ici, vous pouvez appeler une fonction pour charger les détails du livre à partir de l'ID
      } else {
        // Gérer le cas où l'ID n'est pas trouvé, par exemple en redirigeant
        this.router.navigate(['/']);
      }
    });
  }

  getRdv(id: string) {
    this.rdvService.getRDV(id).subscribe(
      (response) => {
        this.rdv = response.result;

      },
      (error) => {
        // alert('Erreur: ' + error.message);
      }
    );
  }

  getDetails(id: string) {
    this.rdvService.getListDetails(id).subscribe(
      (response) => {
        this.listRdvDet = response.result;
      },
      (error) => {
        // alert('Erreur: ' + error.message);
      }
    );
  }


}
