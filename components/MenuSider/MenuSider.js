import style from "./MenuSider.module.css";
import { Layout, Menu } from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import {getMenuKeysByPathname} from "config/menus";

const { SubMenu } = Menu;
const { Sider, Header } = Layout;

const renderSubMenu = ({ key, title, icon, children }) => {
    return (
        <SubMenu key={key} icon={icon} title={title}>
            { children.map(renderMenus) }
        </SubMenu>
    );
}

const renderMenuItem = ({ key, icon, path, title, disabled = false }) => {
    return (
        <Menu.Item key={key} disabled={disabled}>
            { icon }
            <Link href={disabled? '': path} style={{marginLeft: '10px'}} disabled={disabled}>
                {title}
            </Link>
        </Menu.Item>
    );
}

const renderMenus = (menu) => {
    if (menu.children.length === 0) {
        return renderMenuItem(menu)
    } else {
        return renderSubMenu(menu);
    }
};

const MenuSider = ({ menus }) => {
    const router = useRouter();
    const [ selectedKey, ...openKeys ] = getMenuKeysByPathname(router.pathname)

    return (
        <Sider width={200}>
            <div className={style.siderContent}>
                <Header className={style.header} >
                    <span className={style.appName}>Multiple CI</span>
                </Header>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[selectedKey]}
                    defaultOpenKeys={openKeys}
                    className={style.menu}
                >
                    {
                        menus
                            .filter(m => m.parentKey === undefined)
                            .map(renderMenus)
                    }
                </Menu>
            </div>
        </Sider>
    );
}

export default MenuSider;
