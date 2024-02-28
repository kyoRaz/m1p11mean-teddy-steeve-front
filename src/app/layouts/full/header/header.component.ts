import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpInterceptorService } from 'src/app/services/interceptor/http-interceptor.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { TokenService } from 'src/app/services/token/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(public dialog: MatDialog, private token: HttpInterceptorService,
    private router: Router,
    private localStorageService: LocalStorageService) { }
  logout() {
    this.token.logout();
  }
}
