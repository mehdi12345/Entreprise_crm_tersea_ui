export const menuItems = [{
        id: 1,
        label: "dashboard.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "dashboard.dashboard.text",
        icon: "uil-home-alt",
        badge: {
            variant: "info",
            text: "dashboard.dashboard.badge"
        },
        link: "/dashboard"
    },
    {
        id: 3,
        label: "dashboard.pages.text",
        isTitle: true
    },
    {
        id: 4,
        label: "dashboard.profile.text",
        icon: "uil-user-circle",
        link: "/dashboard/profile"
    },
    {
        id: 5,
        label: "dashboard.chat.text",
        icon: "uil-comments-alt",
        link: "/dashboard/chat",
        badge: {
            variant: "warning",
            text: "dashboard.chat.badge"
        }
    },
    {
        id: 520,
        label: "dashboard.ads.text",
        icon: "fas fa-ad",
        subItems: [{
                id: 7,
                label: "dashboard.mycars",
                link: "/dashboard/myads",
                parentId: 520
            },
            {
                id: 8,
                label: "dashboard.myboosetdcars",
                link: "/dashboard/myads/boostedads",
                parentId: 520
            }, {
                id: 8,
                label: "dashboard.myauctions",
                link: "/dashboard/myads/myauctions",
                parentId: 520
            }
        ]
    },
    {
        id: 6,
        label: "dashboard.cars.text",
        icon: "fas fa-car",
        link: "/dashboard/mycars",
    },
    {
        id: 15,
        label: "dashboard.parking.text",
        icon: "fas fa-parking",
        link: "/dashboard/myparking",
        badge: {
            variant: "danger",
            text: 'dashboard.parking.badge'
        }
    },
    {
        id: 18,
        label: "dashboard.search.text",
        icon: "fas fa-search",
        subItems: [{
                id: 19,
                label: "dashboard.mysearch.text",
                link: "/dashboard",
                parentId: 18
            },
            {
                id: 20,
                label: "dashboard.myhistory.text",
                link: "/dashboard",
                parentId: 18
            }
        ]
    },
    {
        id: 21,
        label: "dashboard.carswap.text",
        icon: "fas fa-exchange-alt",
        link: "/dashboard",
    },
    {
        id: 25,
        label: "dashboard.transaction.text",
        icon: "fas fa-money-check-alt",
        link: "/dashboard",
    },
    {
        id: 25,
        label: "dashboard.notification.text",
        icon: "far fa-bell",
        link: "/dashboard",
    },
    {
        id: 41,
        label: "dashboard.support.text",
        isTitle: true
    }, {
        id: 42,
        label: "dashboard.faq.text",
        icon: "fas fa-question-circle",
        link: "/dashboard",
    }, {
        id: 62,
        label: "dashboard.connect-support.text",
        icon: "fas fa-life-ring",
        link: "/dashboard",
    },
    {
        id: 63,
        label: "dashboard.authentication.text",
        isTitle: true
    }, {
        id: 64,
        label: "dashboard.logout.text",
        icon: "fas fa-sign-out-alt",
        link: "/dashboard",
    },
];