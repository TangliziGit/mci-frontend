import {Table} from "antd";
import {useEffect, useState} from "react";
import {refreshDataSource} from "../MenuLayout/MenuLayout";

const ModelTable = ({ columns, dataSourceAsync, initialDataSource, showPagination = true }) => {
    const [ tableLoading, setTableLoading ] = useState(true);
    const [ dataSource, setDataSource ] = useState([]);

    const refreshAsync = async () =>
        refreshDataSource(dataSourceAsync, setDataSource)
            .then(() => setTableLoading(false));

    useEffect(() => {
        if (initialDataSource) {
            setDataSource(initialDataSource);
            setTableLoading(false);
        } else {
            refreshAsync();
        }
    }, []);

    return (
        <Table
            loading={tableLoading}
            columns={columns}
            rowKey={'id'}
            dataSource={dataSource}
            pagination={showPagination? {
                showSizeChanger: true,
                showQuickJumper: true,
            }: false}
        />
    )
};

export default ModelTable;
