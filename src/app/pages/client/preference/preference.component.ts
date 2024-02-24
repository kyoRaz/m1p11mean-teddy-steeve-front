import { Component } from '@angular/core';
import { Preference } from 'src/app/models/preference.model';
import { PreferenceService } from 'src/app/services/preference/preference.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent {

  formData: any = {};
  pref!: Preference;
  listEmploye: any = [];
  listService: any = [];
  listPref: any = [];


  constructor(
    private prefService: PreferenceService,
    private storage: LocalStorageService
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

        alert('Succès: ' + response.message);
        this.getListPreference();
      },
      (error) => {
        alert('Erreur: ' + error.message);
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

        alert('Succès: ');
        this.getListPreference();
      },
      (error) => {
        alert('Erreur: ' + error.message);
      }
    );
  }


  deletePref() {
    this.prefService.deletePreference(this.pref._id).subscribe(
      (response) => {

        alert('Succès: ' + response.message);
        this.getListPreference();
      },
      (error) => {
        alert('Erreur: ' + error.message);
      }
    );
  }

}
