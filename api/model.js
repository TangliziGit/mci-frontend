import * as R from "ramda";
import {Badge, Descriptions, Modal, Tag} from "antd";
import moment from "moment";
import Link from "next/link";

export const models = {
    job: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            key: 'suite',
            dataIndex: 'suite',
            title: '测试套件',
            sorter: (a, b) => a.suite.localeCompare(b.suite),
        },
        {
            key: 'category',
            dataIndex: 'category',
            title: '类别',
            filters: [
                { text: 'build', value: 'build' },
                { text: 'boot', value: 'boot' },
                { text: 'functional', value: 'functional' },
                { text: 'performance', value: 'performance' },
            ],
            onFilter: (value, record) => record.category.includes(value),
            render: value => <Tag color='purple'> {value} </Tag>,
        },
        {
            key: 'os',
            dataIndex: 'os',
            title: '操作系统',
            filters: [
                { text: 'CentOS', value: 'centos' },
                { text: 'Debian', value: 'debian' },
                { text: 'Arch Linux', value: 'archlinux' },
            ],
            onFilter: (value, record) => record.os.includes(value),
            render: value => <Tag color='geekblue'> {value} </Tag>,
        },
        {
            key: 'os_arch',
            dataIndex: 'os_arch',
            title: 'CPU架构',
            filters: [
                { text: 'x86_64', value: 'x86_64' },
                { text: 'aarch64', value: 'aarch64' },
            ],
            onFilter: (value, record) => record.os.includes(value),
            render: value => <Tag color='orange'> {value} </Tag>,
        },
        {
            key: 'stage',
            dataIndex: 'stage',
            title: '测试阶段',
            render: value => <Tag color='cyan' key={value}> {value} </Tag>,
        },
        {
            key: 'start_time',
            dataIndex: 'start_time',
            title: '开始时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
        },
        {
            key: 'end_time',
            dataIndex: 'end_time',
            title: '结束时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
        },
        {
            key: 'state',
            dataIndex: 'state',
            title: '运行状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('waiting'),  () => [ '创建中', 'processing' ] ],
                    [ R.equals('running'),  () => [ '运行中', 'processing' ] ],
                    [ R.equals('done'),     () => [ '已结束', 'success' ] ],
                    [ R.equals('canceled'), () => [ '已撤销', 'error' ] ],
                    [ R.T,                  () => [ '未知错', 'error' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}><Badge status={status} text={v}/></Tag>;
                },
            )
        },
        {
            key: 'success',
            dataIndex: 'success',
            title: '测试结果',
            render: R.pipe(
                R.cond([
                    [ R.equals(true), () => [ '成功', 'green' ] ],
                    [ R.equals(false),() => [ '失败', 'red' ] ],
                    [ R.T,            () => [ '等待', 'grey' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}>{v}</Tag>;
                },
            )
        },
    ],

    plan: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id.localeCompare(b.id),
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: '测试套件',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'repository',
            dataIndex: 'repository',
            title: '代码仓库',
            render: value => <a href={value}> {value.split('/').slice(-2).join('/')} </a>,
        },
        {
            key: 'PKGBUILD',
            dataIndex: 'PKGBUILD',
            title: 'PKGBUILD',
            render: value => value
                ? <a href={value}> {value.split('/').slice(-2).join('/')} </a>
                : "无",
        },
        {
            key: 'stages',
            dataIndex: 'stages',
            title: '测试阶段',
            render: stages => stages.map(stage => {
                switch (stage.state) {
                    case 'success':
                        return <Tag color='green' key={stage.name}> {stage.name} </Tag>
                    case 'failure':
                        return <Tag color='red' key={stage.name}> {stage.name} </Tag>
                    case 'running':
                        return <Tag color='geekblue' key={stage.name}> {stage.name} </Tag>
                    case 'waiting':
                        return <Tag color='volcano' key={stage.name}> {stage.name} </Tag>
                }
            })
        },
        {
            key: 'start_time',
            dataIndex: 'start_time',
            title: '开始时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
        },
        {
            key: 'end_time',
            dataIndex: 'end_time',
            title: '结束时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
        },
    ],

    machine: [
        {
            key: 'id',
            dataIndex: 'mac',
            title: 'MAC地址',
            sorter: (a, b) => a.mac.localeCompare(b.mac),
        },
        {
            key: 'arch',
            dataIndex: 'arch',
            title: 'CPU架构',
            filters: [
                { text: 'x86_64', value: 'x86_64' },
                { text: 'aarch64', value: 'aarch64' },
            ],
            onFilter: (value, record) => record.os.includes(value),
            render: value => <Tag color='orange'> {value} </Tag>,
        },
        {
            key: 'ip',
            dataIndex: 'ip',
            title: 'IP地址',
        },
        {
            key: 'job_id',
            dataIndex: 'job_id',
            title: '当前任务',
            render: id => <Link href={`/job/${id}`}>{id}</Link>
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '内部状态',
            render: status => <Tag color={'geekblue'}>{status}</Tag>
        },
        {
            key: 'state',
            dataIndex: 'state',
            title: '运行状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('idle'),     () => [ '空闲', 'success' ] ],
                    [ R.equals('busy'),     () => [ '运行', 'processing' ] ],
                    [ R.equals('down'),     () => [ '宕机', 'error' ] ],
                    [ R.T,                  () => [ '未知', 'error' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}><Badge status={status} text={v}/></Tag>;
                },
            )
        },
    ],
};

export const modelColumns =
    R.map(R.filter(item => (item?.isDetailInformation ?? false) === false))(models)
