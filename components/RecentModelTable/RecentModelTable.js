import {Table} from "antd";
import {useEffect, useState} from "react";
import {refreshDataSource} from "../MenuLayout/MenuLayout";

const RecentModelTable = ({ columns, dataSourceAsync, count, timeColumn }) => {
    const [ tableLoading, setTableLoading ] = useState(true);
    const [ dataSource, setDataSource ] = useState([]);

    const refreshAsync = async () =>
        refreshDataSource(dataSourceAsync, setDataSource)
            .then(() => setTableLoading(false));

    useEffect(() => {
        refreshAsync();
    }, []);

    const data = [...dataSource]
        .sort((a, b) => a[timeColumn] - b[timeColumn])
        .slice(0, count);

    return (
        <Table
            loading={tableLoading}
            columns={columns}
            rowKey={'id'}
            dataSource={data}
            pagination={false}
        />
    )
};

export default RecentModelTable;
