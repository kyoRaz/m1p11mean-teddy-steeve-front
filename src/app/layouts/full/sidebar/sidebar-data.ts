import { NavItem } from './nav-item/nav-item';

export const navItemsManager: NavItem[] = [

  {
    navCap: 'Manager',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/manager/stat',
  },
  {
    displayName: 'Services',
    iconName: 'servicemark',
    route: '/manager/service-page',
  },
  {
    displayName: 'Page Employés',
    iconName: 'users',
    route: '/manager/employe-page',
  },
  {
    displayName: 'Dépense',
    iconName: 'users',
    route: '/manager/depense',
  },

];
export const navItemsEmploye: NavItem[] = [

  {
    navCap: 'Employé',
  },
  {
    displayName: 'Profil',
    iconName: 'user',
    route: '/employe/',
  },
  {
    displayName: 'Tache',
    iconName: 'notes',
    route: '/employe/tache',
  },
  {
    displayName: 'Historique',
    iconName: 'history-toggle',
    route: '/employe/suivi',
  },
  
];
export const navItemsClient: NavItem[] = [

  {
    navCap: 'Client',
  },
  {
    displayName: 'Prendre RDV',
    iconName: 'pencil-plus',
    route: '/client/rdv',
  },
  {
    displayName: 'Historique RDV',
    iconName: 'history-toggle',
    route: '/client/historique',
  },
  {
    displayName: 'Solde',
    iconName: 'brand-cashapp',
    route: '/client/sold',
  },
  {
    displayName: 'Préference',
    iconName: 'star',
    route: '/client/preference',
  },
];
