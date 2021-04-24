import {MenuItem} from '@shell/models/menu-item';

export const MenuList: MenuItem[] = [
  {
    title: 'Lifecycle hooks benchmark',
    link: '/benchmarks/lifecycle-crud',
    icon: 'speed',
    showSubMenu: false,
    isSubMenuShowing: false,
    children: []
  },
  {
    title: 'REST API benchmark',
    link: '',
    icon: 'speed',
    showSubMenu: true,
    isSubMenuShowing: false,
    children: [
      {
        title: 'Random User Generator',
        link: '/benchmarks/random-user-generator',
        icon: 'person',
        showSubMenu: false,
        isSubMenuShowing: false,
        children: []
      },
      {
        title: '{JSON} Placeholder',
        link: '/benchmarks/json-placeholder',
        icon: 'public',
        showSubMenu: false,
        isSubMenuShowing: false,
        children: []
      },
      {
        title: 'Local API server',
        link: '/benchmarks/local-rest-api',
        icon: 'public',
        showSubMenu: false,
        isSubMenuShowing: false,
        children: []
      }
    ]
  }
];
