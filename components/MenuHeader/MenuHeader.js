import {Breadcrumb, Card, Layout} from "antd";
import style from './MenuHeader.module.css';
import {getMenuKeysByPathname, menuMap} from "config/menus";
import * as R from 'ramda';
import {useRouter} from "next/router";
import {EnvironmentOutlined} from "@ant-design/icons";

const { Header } = Layout;

const MenuHeader = () => {
    const router = useRouter();
    const menuKeys = getMenuKeysByPathname(router.pathname)

    const handle = R.pipe(
        R.reverse(),
        R.map(key => {
            return <Breadcrumb.Item key={key}> { menuMap[key].title } </Breadcrumb.Item>
        })
    );

    return (
        <Header>
            <div className={style.header}>
                <EnvironmentOutlined style={{margin: '12px'}}/>
                <Breadcrumb className={style.breadcrumb} separator=">">
                    {
                        handle(menuKeys)
                    }
                </Breadcrumb>
            </div>
        </Header>
    );
}

export default MenuHeader;
