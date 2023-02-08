import * as R from "ramda";
import {Badge, Descriptions, Modal, Tag} from "antd";
import moment from "moment";

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
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
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

    organization: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'nickname',
            dataIndex: 'nickname',
            title: '昵称',
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
        },
        {
            key: 'peers',
            dataIndex: 'peers',
            title: '包含节点',
            render: R.pipe(
                R.map(({ id }) => <Tag key={id} color={'purple'}>{id}</Tag>),
                R.splitEvery(5),
                R.addIndex(R.map)((arr, i) => R.append(<br key={i}/>)(arr)),
                R.flatten,
            ),
        },
        {
            key: 'networkID',
            dataIndex: 'networkID',
            title: '所属网络ID',
            render: value => <Tag key={value} color={'green'}>{value}</Tag>
        },
    ],

    user: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'nickname',
            dataIndex: 'nickname',
            title: '昵称',
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
        },
        {
            key: 'role',
            dataIndex: 'role',
            title: '角色',
            filters: [
                { text: 'admin', value: 'admin' },
                { text: 'user', value: 'user' },
            ],
            onFilter: (value, record) => record.role.includes(value),
            render: value => {
                if (value === 'admin')
                    return <Tag color={'red'}>{value}</Tag>;
                else
                    return <Tag color={'blue'}>{value}</Tag>;
            }
        },
        {
            key: 'organizationID',
            dataIndex: 'organizationID',
            title: '所属组织ID',
            render: value => <Tag color={'geekblue'}>{value}</Tag>
        },
        {
            key: 'networkID',
            dataIndex: 'networkID',
            title: '所属网络ID',
            render: value => <Tag color={'green'}>{value}</Tag>
        },
        // {
        //     key: 'actions',
        //     dataIndex: 'actions',
        //     title: '操作',
        //     render: (_, { id }) => {
        //         return (
        //             <Button.Group key={id}>
        //                 <Button onClick={handleDeleteUser(id)}>删除</Button>
        //             </Button.Group>
        //         );
        //     }
        // }
    ],

    channel: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'nickname',
            dataIndex: 'nickname',
            title: '昵称',
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
        },
        {
            key: 'organizations',
            dataIndex: 'organizations',
            title: '包含组织ID',
            render: R.pipe(
                R.map(({ id }) => <Tag key={id} color={'purple'}>{id}</Tag>),
                R.splitEvery(5),
                R.addIndex(R.map)((arr, i) => R.append(<br key={i}/>)(arr)),
                R.flatten,
            ),
        },
        {
            key: 'networkID',
            dataIndex: 'networkID',
            title: '所属网络ID',
            render: value => <Tag key={value} color={'green'}>{value}</Tag>
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('running'),  () => [ '运行中', 'success' ] ],
                    [ R.equals('starting'), () => [ '创建中', 'processing' ] ],
                    [ R.equals('stopped'),  () => [ '已停止', 'warning' ] ],
                    [ R.equals('error'),    () => [ '已出错', 'error' ] ],
                    [ R.T,                     () => [ '未知错', 'error' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}><Badge status={status} text={v}/></Tag>;
                },
            )
        },
    ],

    chaincode: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'nickname',
            dataIndex: 'nickname',
            title: '昵称',
            sorter: (a, b) => a.nickname.localeCompare(b.nickname),
        },
        {
            key: 'label',
            dataIndex: 'label',
            title: '标签',
        },
        // the data of those fields below is too long.
        // for better presentation, these are moved into the modal in the page.
        // the field `isDetailInformation: true` is used to do this.
        {
            key: 'packageID',
            dataIndex: 'packageID',
            title: '包ID',
            isDetailInformation: true,
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: '地址',
            isDetailInformation: true,
        },
        {
            key: 'policy',
            dataIndex: 'policy',
            title: '策略',
        },
        {
            key: 'version',
            dataIndex: 'version',
            title: '版本',
        },
        {
            key: 'sequence',
            dataIndex: 'sequence',
            title: '序列号',
        },
        {
            key: 'initRequired',
            dataIndex: 'initRequired',
            title: '需要初始化',
            render: value => value ? '是' : '否',
        },
        {
            key: 'channelID',
            dataIndex: 'channelID',
            title: '所属通道ID',
            render: value => <Tag color={'purple'}>{value}</Tag>
        },
        {
            key: 'networkID',
            dataIndex: 'networkID',
            title: '所属网络ID',
            render: value => <Tag color={'green'}>{value}</Tag>
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('starting'),     () => [ '创建中', 'processing' ] ],
                    [ R.equals('unpacking'),    () => [ '解压中', 'processing' ] ],
                    [ R.equals('installing'),   () => [ '安装中', 'processing' ] ],
                    [ R.equals('building'),     () => [ '构建中', 'processing' ] ],
                    [ R.equals('running'),      () => [ '运行中', 'success' ] ],
                    [ R.equals('stopped'),      () => [ '已停止', 'warning' ] ],
                    [ R.equals('error'),        () => [ '已出错', 'error' ] ],
                    [ R.T,                    () => [ '未知错', 'error' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}><Badge status={status} text={v}/></Tag>;
                },
            )
        },
        // {
        //     key: 'actions',
        //     dataIndex: 'actions',
        //     title: '操作',
        //     render: (_, { ccid }) => {
        //         return (
        //             <Button.Group key={ccid}>
        //                 <Button onClick={handleInvokeChaincode(ccid)}>调用链码</Button>
        //             </Button.Group>
        //         );
        //     }
        // }
    ],

    chaincodeTransaction: [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'txID',
            dataIndex: 'txID',
            title: '交易ID',
            sorter: (a, b) => a.txID - b.txID,
            isDetailInformation: true,
        },
        {
            key: 'invokeType',
            dataIndex: 'invokeType',
            title: '调用类型',
            filters: [
                { text: 'init', value: 'init' },
                { text: 'query', value: 'query' },
                { text: 'execute', value: 'execute' },
            ],
            onFilter: (value, record) => record.invokeType.includes(value),
            render: value => <Tag color={'blue'}>{value}</Tag>
        },
        {
            key: 'args',
            dataIndex: 'args',
            title: '参数',
            render: value => {
                const getTag = (arg, idx) => {
                    if (idx === 0)
                        return <Tag color='red' key={arg}> { arg } </Tag>;
                    return <Tag key={arg}> { arg } </Tag>;
                };

                const compute = R.pipe(
                    R.addIndex(R.map)((arg, idx) => getTag(arg, idx)),
                    R.splitEvery(5),
                    R.addIndex(R.map)((row, i) => [ ...row, <br key={i}/> ]),
                    R.flatten()
                );
                return <div> { compute(value) } </div>;
            },
        },
        {
            key: 'message',
            dataIndex: 'message',
            title: '消息',
            isDetailInformation: true,
            render: value => atob(value),
        },
        {
            key: 'userID',
            dataIndex: 'userID',
            title: '用户ID',
            render: value => <Tag key={value} color={'purple'}>{value}</Tag>
        },
        {
            key: 'chaincodeID',
            dataIndex: 'chaincodeID',
            title: '所属链码ID',
            render: value => <Tag key={value} color={'green'}>{value}</Tag>
        },
        {
            key: 'peerURLs',
            dataIndex: 'peerURLs',
            title: 'Peer URL',
            render: value => {
                const compute = R.pipe(
                    R.map(url => <Tag color='cyan' key={url}> { url } </Tag>),
                    R.splitEvery(3),
                    R.addIndex(R.map)((row, i) => [ ...row, <br key={i}/> ]),
                    R.flatten()
                );
                return <div> { compute(value) } </div>;
            },
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            render: R.pipe(
                R.cond([
                    [ R.equals('success'),  () => [ '已成功', 'success' ] ],
                    [ R.equals('execute'),  () => [ '执行中', 'processing' ] ],
                    [ R.equals('error'),    () => [ '已出错', 'error' ] ],
                    [ R.T,                  () => [ '未知错', 'error' ] ],
                ]),
                ([ v, status ]) => {
                    return <Tag color={status}><Badge status={status} text={v}/></Tag>;
                },
            )
        },
    ],

    block: [
        {
            key: 'number',
            dataIndex: [ 'rawBlock', 'header', 'number' ],
            title: '块号',
            render: value => value || '0'
        },
        {
            key: 'dataHash',
            dataIndex: [ 'rawBlock', 'header', 'data_hash' ],
            title: '块内容 Hash'
        },
        {
            key: 'previousHash',
            dataIndex: [ 'rawBlock', 'header', 'previous_hash' ],
            title: '前向块头 Hash',
            render: value => value || '无'
        },
        // {
        //     key: 'metadata',
        //     dataIndex: [ 'rawBlock', 'metadata', 'metadata' ],
        //     title: '元数据',
        //     isDetailInformation: true,
        //     isArray: true,
        //     // render: metadataList => metadataList.map(metadata => (<><Tag style={{whiteSpace: 'pre-wrap'}}>{metadata || '空'}</Tag><br /></>)),
        // },
        {
            key: 'data',
            dataIndex: 'data',
            title: '数据',
            isDetailInformation: true,
            isArray: true,
            columns: [
                {
                    key: 'key',
                    dataIndex: 'key',
                    title: '索引'
                },
                {
                    key: 'headerType',
                    dataIndex: [ 'ChannelHeader', 'type' ],
                    title: '头类型',
                    render: value => {
                        const headerType = [
                            'MESSAGE',
                            'CONFIG',
                            'CONFIG_UPDATE',
                            'ENDORSER_TRANSACTION',
                            'ORDERER_TRANSACTION',
                            'DELIVER_SEEK_INFO',
                            'CHAINCODE_PACKAGE'
                        ];

                        return <Tag color={'red'}>{headerType[value] || 'UNKNOWN'}</Tag>
                    }
                },
                {
                    key: 'timestamp',
                    dataIndex: [ 'ChannelHeader', 'timestamp', 'seconds' ],
                    title: '时间戳'
                },
                {
                    key: 'channelID',
                    dataIndex: [ 'ChannelHeader', 'channel_id' ],
                    title: '通道ID',
                    render: value => <Tag color={'green'}> { value || '无' } </Tag>,
                },
                {
                    key: 'txID',
                    dataIndex: [ 'ChannelHeader', 'tx_id' ],
                    title: '交易ID',
                    render: value => <Tag color={'purple'}> { value || '无' } </Tag>,
                },
                {
                    key: 'extension',
                    dataIndex: [ 'ChannelHeader', 'extension' ],
                    title: '扩展信息',
                    render: value => value || '无'
                },
                {
                    key: 'MSP_ID',
                    dataIndex: 'MSPID',
                    title: 'MSP ID',
                },
                {
                    key: 'creator',
                    dataIndex: 'Creator',
                    title: '创建者证书',
                    render: value => <Tag style={{ whiteSpace: 'pre-wrap', lineHeight: '1', fontSize: '10px' }}>{value}</Tag>
                },
            ],
        },
    ]
};

export const modelColumns =
    R.map(R.filter(item => (item?.isDetailInformation ?? false) === false))(models)