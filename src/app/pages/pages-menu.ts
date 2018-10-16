import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '服务',
    icon: 'nb-gear',
    children: [
      {
        title: '站点',
        link: '/pages/server/server-list',
      },
    ],
  },
  {
    title: '策略',
    icon: 'nb-compose',
    link: '/pages/policy',
  },
];
