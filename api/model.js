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
            onFilter: (value, record) => record.os_arch.includes(value),
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
            sorter: (a, b) => parseInt(a.start_time) - parseInt(b.start_time),
        },
        {
            key: 'end_time',
            dataIndex: 'end_time',
            title: '结束时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
            sorter: (a, b) => parseInt(a.end_time) - parseInt(b.end_time),
        },
        {
            key: 'state',
            dataIndex: 'state',
            title: '运行状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('waiting'),  () => [ '调度中', 'warning' ] ],
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
            sorter: (a, b) => parseInt(a.start_time) - parseInt(b.start_time),
        },
        {
            key: 'end_time',
            dataIndex: 'end_time',
            title: '结束时间',
            render: value => moment.unix(value).format('YYYY-MM-DD hh:mm:ss'),
            sorter: (a, b) => parseInt(a.end_time) - parseInt(b.end_time),
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
            onFilter: (value, record) => record.os_arch.includes(value),
            render: value => <Tag color='orange'> {value} </Tag>,
        },
        {
            key: 'ip',
            dataIndex: 'ip',
            title: 'IP地址',
            render: ip => ip === undefined ? "无绑定": ip,
        },
        {
            key: 'job',
            dataIndex: 'job',
            title: '最近任务',
            render: id => id === undefined || id === ''
                ? "无"
                : <Link href={`/job/${id}`}>{id}</Link>,
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '内部状态',
            render: status => <Tag color={'geekblue'}>{status || "暂无"}</Tag>
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

    repo: [
        {
            key: 'id',
            dataIndex: 'name',
            title: '名称',
            sorter: (a, b) => a.id.localeCompare(b.id),
            render: name => <Link href={`/repo/${name}`}>{name}</Link>
        },
        {
            key: 'job_count',
            dataIndex: 'job_count',
            title: '测试任务数',
            sorter: (a, b) => a.job_count - b.job_count,
        },
        {
            key: 'plan_count',
            dataIndex: 'plan_count',
            title: '测试计划数',
            sorter: (a, b) => a.plan_count - b.plan_count,
        },
        {
            key: 'success_rate',
            dataIndex: 'success_rate',
            title: '测试成功率',
            sorter: (a, b) => a.success_rate - b.success_rate,
            render: rate => <Tag color={'green'}>{`${(rate * 100).toFixed(2)} %`}</Tag>
        },
        {
            key: 'avg_duration',
            dataIndex: 'avg_duration',
            title: '平均耗时 (秒)',
            sorter: (a, b) => a.avg_duration - b.avg_duration,
            render: duration => <Tag color={'geekblue'}> {duration.toFixed(2)} </Tag>
        },
    ],
};

export const modelColumns =
    R.map(R.filter(item => (item?.isDetailInformation ?? false) === false))(models)
