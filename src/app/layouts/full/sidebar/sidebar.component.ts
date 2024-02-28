import { Component, OnInit } from '@angular/core';
import { navItemsClient,navItemsEmploye,navItemsManager } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems:any;

  constructor(public navService: NavService,private token: TokenService) {}

  ngOnInit(): void {
    this.setnav();
  }
  setnav(){
    let user =this.token.getUser();
    console.log(user);
    if(user.roleId.libelle=== 'client')this.navItems=navItemsClient;
    if(user.roleId.libelle=== 'employe')this.navItems=navItemsEmploye;
    if(user.roleId.libelle=== 'manager')this.navItems=navItemsManager;
  }
}
