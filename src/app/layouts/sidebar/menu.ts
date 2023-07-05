import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx bxs-dashboard',
        link: 'dashboard',
    },
    {
        id: 3,
        isLayout: true
    },
    {
        id: 4,
        label: 'MENUITEMS.INSTITUTIONS.TEXT',
        isTitle: true
    },
    {
        id: 5,
        isLayout: true
    },
    {
        id: 6,
        label: 'MENUITEMS.FINANCIALINSTITUTIONS.TEXT',
        icon: 'dripicons-calendar',
        badge: {
            variant: 'primary',
            text: '25',
        },
        subItems: [
            {
                id: 7,
                label: 'MENUITEMS.FINANCIALINSTITUTIONS.LIST.MANAGEINSTITUTIONS',
                link: '/frontoffice/institutions/inquiry',
                parentId: 6
            }
        ]
    },
    {
        id: 8,
        label: 'MENUITEMS.CHANNELSANDROUTES.TEXT',
        isTitle: true
    },
    {
        id: 9,
        isLayout: true
    },
    {
        id: 10,
        label: 'MENUITEMS.BANKCHANNELS.TEXT',
        icon: 'dripicons-checklist',
        subItems: [
            {
                id: 11,
                label: 'MENUITEMS.BANKCHANNELS.LIST.MANAGECHANNELS',
                link: '/frontoffice/bankchannels/inquiry',
                parentId: 10
            },
        ]
    },
    {
        id: 12,
        label: 'MENUITEMS.ROUTES.TEXT',
        icon: 'dripicons-document-edit',
        subItems: [
            {
                id: 13,
                label: 'MENUITEMS.ROUTES.LIST.MANAGEROUTES',
                link: '/frontoffice/routes/inquiry',
                parentId: 12
            },
        ]
    },
    {
        id: 14,
        label: 'MENUITEMS.TRANSACTIONS.TEXT',
        isTitle: true
    },
    {
        id: 15,
        isLayout: true
    },
    {
        id: 16,
        label: 'MENUITEMS.TRANSFERS.TEXT',
        icon: 'dripicons-document-edit',
        subItems: [
            {
                id: 17,
                label: 'MENUITEMS.TRANSFERS.LIST.CREDITTRANSFERS',
                link: '/frontoffice/credittransfers/inquiry',
                parentId: 16
            },
            {
                id: 18,
                label: 'MENUITEMS.TRANSFERS.LIST.DEBITTRANSFERS',
                link: '/frontoffice/debittransfers/inquiry',
                parentId: 16
            },
        ]
    },
    {
        id: 19,
        label: 'MENUITEMS.DISPUTES.TEXT',
        icon: 'dripicons-document-edit',
        subItems: [
            {
                id: 20,
                label: 'MENUITEMS.DISPUTES.LIST.MANAGEDISPUTES',
                link: '/frontoffice/disputes/inquiry',
                parentId: 19
            },
        ]
    },
    {
        id: 21,
        label: 'MENUITEMS.SETTLEMENTS.TEXT',
        icon: 'dripicons-document-edit',
        subItems: [
            {
                id: 22,
                label: 'MENUITEMS.SETTLEMENTS.LIST.MANAGESETTLEMENTS',
                link: '/frontoffice/settlements/inquiry',
                parentId: 21
            },
        ]
    },
    {
        id: 23,
        isLayout: true
    },
    {
        id: 24,
        label: 'MENUITEMS.UTILITIES.TEXT',
        isTitle: true
    },
    {
        id: 25,
        isLayout: true
    },
    {
        id: 26,
        label: 'MENUITEMS.QUERY.TEXT',
        icon: 'dripicons-search',
        subItems: [
            {
                id: 27,
                label: 'MENUITEMS.QUERY.LIST.TRANSACTIONSTATUS',
                link: '/utilities/transaction/status',
                parentId: 26
            }
        ]
    },
    {
        id: 28,
        label: 'MENUITEMS.REPORT.TEXT',
        icon: 'dripicons-graph-bar',
        subItems: [
            {
                id: 29,
                label: 'MENUITEMS.REPORT.LIST.REPORTS',
                link: '/utilities/transaction/reports',
                parentId: 28
            },
        ]
    },
    {
        id: 30,
        isLayout: true
    },
    {
        id: 31,
        label: 'MENUITEMS.ADMINISTRATION.TEXT',
        isTitle: true
    },
    {
        id: 32,
        isLayout: true
    },
    {
        id: 33,
        label: 'MENUITEMS.PRIVILEDGES.TEXT',
        icon: 'dripicons-lock',
        subItems: [
            {
                id: 34,
                label: 'MENUITEMS.PRIVILEDGES.LIST.MANAGEROLES',
                link: '/administration/privileges/manage',
                parentId: 33
            },
            {
                id: 35,
                label: 'MENUITEMS.PRIVILEDGES.LIST.MANAGEPROFILES',
                link: '/administration/profiles/manage',
                parentId: 33
            },
        ]
    }
];

