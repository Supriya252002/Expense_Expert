import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },

  {
    routeLink: '/master/instrument-list',
    icon: 'biotech',
    label: 'Master Table',
    items: [],
  },
  {
    routeLink: '/log-entry/all-entry-listing',
    icon: 'login',
    label: 'Log Entry',
    items: [],
  },
  // {
  //   routeLink: '/log-entry/select-instrument',
  //   icon: 'table_chart',
  //   label: 'Log Entry',
  //   items: [],
  // },
];
