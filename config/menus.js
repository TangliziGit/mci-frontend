import {ScheduleOutlined, FieldTimeOutlined, HomeOutlined, BranchesOutlined, ClusterOutlined} from "@ant-design/icons";

// TODO: icons
const rawMenus = [
    { key: 'index', title: '首页', path: '/', icon: <HomeOutlined /> },

    { key: 'job', title: '测试任务', icon: <FieldTimeOutlined /> },
    { key: 'job-list', parentKey: "job", title: '任务列表', path: '/job' },
    { key: 'job-description', parentKey: "job", title: '任务详情', path: '/job/[id]' },

    { key: 'plan', title: '测试计划', icon: <ScheduleOutlined /> },
    { key: 'plan-list', parentKey: "plan", title: '计划列表', path: '/plan' },
    { key: 'plan-description', parentKey: "plan", title: '计划详情', path: '/plan/[id]' },

    { key: 'repository', title: '代码仓库', icon: <BranchesOutlined /> },
    { key: 'repository-list', parentKey: "repository", title: '仓库列表', path: '/repository' },

    { key: 'machine', title: '测试机状态', icon: <ClusterOutlined /> },
    { key: 'machine-list', parentKey: "machine", title: '测试机列表', path: '/machine' },
];

const getMenusWithChildren = (rawMenus) => {
    const menus = rawMenus.map(m => ({ children: [], ...m }));
    const items = menus.reduce((map, m) => {
        return { [m.key]: m, ...map };
    }, {});

    menus
        .filter(m => m?.parentKey)
        .forEach(m => items[m.parentKey].children.push(m));

    return [ menus, items ];
}

export const [ menus, menuMap ] = getMenusWithChildren(rawMenus);

export const getMenuKeysByPathname = (pathname) => {
    const keys = (menu) => {
        if (menu === undefined)
            return [];
        return [ menu.key, ...keys(menuMap[menu.parentKey]) ]
    }
    return keys(menus.find(m => m.path === pathname))
};

