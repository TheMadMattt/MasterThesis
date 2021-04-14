export interface MenuItem {
  title: string;
  link: string;
  icon: string;
  showSubMenu: boolean;
  isSubMenuShowing: boolean;
  children: MenuItem[];
}
