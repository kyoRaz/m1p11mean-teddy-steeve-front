import { Component } from '@angular/core';
import { Preference } from 'src/app/models/preference.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PreferenceService } from 'src/app/services/preference/preference.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
})
export class PreferenceComponent {

  formData: any = {};
  pref!: Preference;
  listEmploye: any = [];
  listService: any = [];
  listPref: any = [];


  constructor(
    private prefService: PreferenceService,
    private storage: LocalStorageService,
    public loader: LoaderService,
    public sweet: AlertService
  ) { }

  ngOnInit(): void {

    this.getListEmployeAndInitFormDataIdEmp();
    this.getListServiceAndInitFormDataIdServ();
    this.getListPreference();

  }

  getListEmployeAndInitFormDataIdEmp(): void {
    this.prefService.getListEmploye().subscribe(
      (response) => {
        this.listEmploye = response;
        // Définir la valeur par défaut de formData.idEmp après l'initialisation de listEmploye
        if (this.listEmploye.length > 0) {
          this.formData.idEmp = this.listEmploye[0]._id;
        }
      }
    );
  }

  getListServiceAndInitFormDataIdServ(): void {
    this.prefService.getListService().subscribe(
      (response) => {
        this.listService = response.resultat;
        // Définir la valeur par défaut de formData.idServ après l'initialisation de listService
        if (this.listService.length > 0) {
          this.formData.idServ = this.listService[0]._id;
        }
      }
    );
  }

  getListPreference(): void {
    this.prefService.getListPreference().subscribe(
      (response) => {
        this.listPref = response.resultat;
        // console.log(this.listPref);
      }
    );
  }

  setPreference(pref: Preference) {
    this.pref = pref;
    console.log("🚀 ~ PreferenceComponent ~ setPreference ~ this.pref:", this.pref)
  }



  onSubmit(formData: any) {
    console.log(formData);
    let data = {
      idService: formData.idServ,
      idEmpFav: formData.idEmp,
    }
    this.prefService.createPreference(data).subscribe(
      (response) => {
        this.sweet.showSuccessAlert("préférence enregistré");
        this.getListPreference();
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
      }
    );
  }

  onUpdate(formData: any) {
    console.log(formData);
    let data = {
      idService: formData.idServ,
      idEmpFav: formData.idEmp,
    }
    this.prefService.updatePreference(this.pref._id, data).subscribe(
      (response) => {

        this.sweet.showSuccessAlert("préférence enregistrer");
        this.getListPreference();
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
      }
    );
  }


  deletePref() {
    this.prefService.deletePreference(this.pref._id).subscribe(
      (response) => {

        this.sweet.showSuccessAlert("préférence supprimé");
        this.getListPreference();
      },
      (error) => {
        this.sweet.showErrorAlert("Erreur lors  de la transaction");
        console.log('Erreur: ' + error.message);
      }
    );
  }

}
