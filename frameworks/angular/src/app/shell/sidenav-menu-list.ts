import {MenuItem} from '@shell/models/menu-item';

export const MenuList: MenuItem[] = [
  {
    title: 'Lifecycle CRUD benchmark',
    routerLink: 'benchmarks/lifecycle-crud',
    icon: 'speed'
  },
  {
    title: 'REST API CRUD benchmark',
    routerLink: 'benchmarks/rest-api-crud',
    icon: ''
  }
];
