import MenuLayout, {handleErrorWithMessage, refreshDataSource} from "components/MenuLayout/MenuLayout";
import {Button, Input, Table} from "antd";
import { useEffect, useState } from 'react';
import {PlusOutlined} from "@ant-design/icons";
import {Subject, debounceTime, throttleTime} from "rxjs";
import ModelDrawer from "../ModelDrawer/ModelDrawer";
import RefreshTimer from "../RefreshTimer/RefreshTimer";

const { Search } = Input;

const
    THROTTLE_TIME = 1000,
    DEBOUNCE_TIME = 100;

const ModelPage = ({
                       drawerTitle, extra,
                       columns, dataSourceAsync, initialDataSource,
                       rowKey = 'id', rowSelection,
                       refreshEnabled, refreshSubject,
                       handleSubmit,
                       children }) => {
    const [ tableLoading, setTableLoading ] = useState(false);
    const [ drawerVisible, setDrawerVisible ] = useState(false);

    const [ searchName, setSearchName ] = useState('');
    const handleSearch = (searchName) => {
        setSearchName(searchName);
        setTableLoading(false);
    };

    const searchInputChange$ = new Subject();
    searchInputChange$
        .pipe(
            throttleTime(THROTTLE_TIME),
            debounceTime(DEBOUNCE_TIME),
        ).subscribe(handleSearch);

    searchInputChange$
        .subscribe(() => {
            setTableLoading(true);
        });

    const [ dataSource, setDataSource ] = useState([]);
    const refreshAsync = () => refreshDataSource(dataSourceAsync, setDataSource);
    useEffect(() => {
        if (initialDataSource !== undefined) {
            setDataSource(initialDataSource);
        } else {
            refreshAsync();
        }
    }, []);

    refreshSubject.subscribe(refreshAsync);

    const drawerEnabled = drawerTitle !== undefined;
    const extraEnabled = extra !== undefined;

    return (
        <MenuLayout>
            <div className="content-margin" >
                <Search
                    placeholder="按ID查询"
                    onSearch={handleSearch}
                    onChange={e => searchInputChange$.next(e.target.value)}
                    style={{ maxWidth: '300px' }}
                />

                <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
                    { refreshEnabled ? <RefreshTimer refreshAsync={refreshAsync} />: '' }

                    {
                        drawerEnabled ?
                            <Button
                                type="primary"
                                onClick={() => setDrawerVisible(true)}
                            >
                                <PlusOutlined/> {drawerTitle}
                            </Button> : ''
                    }

                    { extraEnabled ? extra : '' }
                </div>
            </div>

            <ModelDrawer
                title={ drawerTitle }
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                handleSubmit={handleSubmit}
            >
                { children }
            </ModelDrawer>

            <Table
                className="content-margin"
                loading={tableLoading}
                rowKey={rowKey}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource.filter(x => {
                    if (x.mac !== undefined)
                        return x.mac.toLowerCase().includes(searchName.toLowerCase())
                    if (x.id !== undefined)
                        return x.id.toLowerCase().includes(searchName.toLowerCase())
                    return x.name.toString().includes(searchName.toLowerCase())
                })}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                }}
            />

        </MenuLayout>
    )
}

export default ModelPage;
