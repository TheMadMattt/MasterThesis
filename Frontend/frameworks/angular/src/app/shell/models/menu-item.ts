export interface MenuItem {
  title: string;
  route: string;
  icon: string;
  showSubMenu: boolean;
  isSubMenuShowing: boolean;
  children: MenuItem[];
}
