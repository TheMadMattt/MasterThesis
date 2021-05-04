import {MenuItem} from '@shell/models/menu-item';

export const MenuList: MenuItem[] = [
  {
    title: 'Home',
    route: '/',
    icon: 'home',
    showSubMenu: false,
    isSubMenuShowing: false,
    children: []
  },
  {
    title: 'Lifecycle hooks benchmark',
    route: '/lifecycle-benchmark/lifecycle-hooks',
    icon: 'speed',
    showSubMenu: false,
    isSubMenuShowing: false,
    children: []
  },
  {
    title: 'REST API benchmark',
    route: '',
    icon: 'speed',
    showSubMenu: true,
    isSubMenuShowing: false,
    children: [
      {
        title: '{JSON} Placeholder',
        route: '/api-benchmark/json-placeholder',
        icon: 'public',
        showSubMenu: false,
        isSubMenuShowing: false,
        children: []
      },
      {
        title: 'Local API server',
        route: '/api-benchmark/local-rest-api',
        icon: 'public',
        showSubMenu: false,
        isSubMenuShowing: false,
        children: []
      }
    ]
  }
];
