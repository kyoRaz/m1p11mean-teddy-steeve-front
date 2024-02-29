import { Injectable } from '@angular/core';
import Swal, { SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccessAlert(message: string, position: SweetAlertPosition = 'bottom-end', timer: number = 3000) {
    Swal.fire({
      title: 'Succès !',
      text: message,
      icon: 'success',
      position: position, // Utilisation de la position
      toast: true, // Active le mode "toast"
      timer: 3000, // Durée d'affichage de l'alerte
      timerProgressBar: true, // Affiche une barre de progression
      showConfirmButton: false, // Cache le bouton de confirmation
    });
  }

  showErrorAlert(message: string, position: SweetAlertPosition = 'bottom-end', timer: number = 3000) {
    Swal.fire({
      title: 'Erreur !',
      text: message,
      icon: 'error',
      position: position, // Utilisation de la position
      toast: true, // Active le mode "toast"
      timer: 3000, // Durée d'affichage de l'alerte
      timerProgressBar: true, // Affiche une barre de progression
      showConfirmButton: false, // Cache le bouton de confirmation
    });
  }


}
