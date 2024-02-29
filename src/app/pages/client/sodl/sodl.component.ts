import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';
import { StatService } from 'src/app/services/stat/stat.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-sodl',
  templateUrl: './sodl.component.html',
  styleUrls: ['./sodl.component.scss']
})
export class SodlComponent implements OnInit {

  solde: any;
  formData = new FormGroup({
    _id: new FormControl(''),
    solde: new FormControl('', [Validators.required])
  });
  idUser: any;

  constructor(private localStorageService: LocalStorageService, public sweet: AlertService, public statService: StatService) { }

  ngOnInit(): void {
    let user = this.localStorageService.getData("user");
    this.idUser = user._id;
    this.getSolde();
  }

  onSubmit(formData: any) {
    console.log(formData);
    this.statService.ajoutSolde(this.idUser, formData.montant).subscribe(
      (response) => {
        this.solde = response.solde;
        this.sweet.showSuccessAlert("préférence enregistré");
        this.getSolde();
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
      }
    );
  }

  getSolde() {
    this.statService.getSolde(this.idUser).subscribe(
      (response) => {
        this.solde = response.solde;
      }, (error: any) => {
        console.error(error);
        console.log("Une erreur s'est produite : " + error.message);
      }
    );
  }

}
