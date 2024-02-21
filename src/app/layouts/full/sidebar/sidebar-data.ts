import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Manager',
  },
  {
    displayName: 'Services',
    iconName: 'rosette',
    route: '/manager/service-page',
  },
  {
    displayName: 'Page Employés',
    iconName: 'aperture',
    route: '/extra/employe-page',
  },
  {
    displayName: 'Badge',
    iconName: 'list',
    route: '/manager/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/manager/chips',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/manager/menu',
  },
  {
    displayName: 'Tache',
    iconName: 'tooltip',
    route: '/manager/tache',
  },
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication/register',
  // },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Activate',
    iconName: 'mood-smile',
    route: '/extra/activate',
  },
  
];
