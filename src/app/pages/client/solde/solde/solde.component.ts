import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { StatService } from 'src/app/services/stat/stat.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.scss']
})
export class SoldeComponent {

  montant: any;
  idUser: any;

  constructor(private localStorageService: LocalStorageService, public sweet: AlertService, public statService: StatService) { }

  ngOnInit(): void {
    let user = this.localStorageService.getData("user");
    this.idUser = user._id;
    this.statService.getSolde(this.idUser).subscribe(
      (response) => {
        this.montant = response.solde;
      }, (error: any) => {
        console.error(error);
        console.log("Une erreur s'est produite : " + error.message);
      }
    );
  }

  onSubmit() { }

}
