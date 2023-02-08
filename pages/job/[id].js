import {useRouter} from "next/router";
import {Badge, Card, Col, Descriptions, List, Row, Statistic, Table, Tabs, Tag} from "antd";
import {PageHeader} from "@ant-design/pro-layout"
import MenuLayout, {refreshDataSource} from "components/MenuLayout/MenuLayout";
import {useEffect, useState} from "react";
import api from "api";
import * as R from "ramda";
import moment from "moment";
import ComponentLoader from "components/ComponentLoader/ComponentLoader";

const { TabPane } = Tabs;

const JobDetailPage = () => {
    const router = useRouter();
    const { id: jobID } = router.query;

    const [ job, setJob ] = useState({});
    const jobIsLoading = Object.keys(job).length === 0;
    useEffect(() => {
        if (jobID)
            refreshDataSource(() => api.getJob({id: jobID}), setJob);
    }, [ jobID ]);

    const renderStatusTag = R.pipe(
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
    );
    const renderSuccess = R.cond([
        [ R.equals(true), () => '成功' ],
        [ R.equals(false),() => '失败' ],
        [ R.T,            () => '运行中' ],
    ]);

    const [startTime, endTime] = [ moment.unix(job?.start_time), moment.unix(job?.end_time)];
    const renderRepoPath = repo => repo === undefined
        ? 'undefined'
        : <a href={repo}> {repo.split('/').slice(-2).join('/')} </a>;

    const renderNetworkDetailInfo = () => (
        <Row>
            <Col span={18}>
                <Descriptions>
                    <Descriptions.Item label={'测试套件'}>{job?.id}</Descriptions.Item>
                    <Descriptions.Item label={'测试类型'}>{job?.category}</Descriptions.Item>
                    <Descriptions.Item label={'测试阶段'}>{job?.stage}</Descriptions.Item>
                    <Descriptions.Item label={'优先级'}>  {job?.priority}</Descriptions.Item>
                    <Descriptions.Item label={'测试仓库'}>{renderRepoPath(job?.repository)}</Descriptions.Item>
                    <Descriptions.Item label={'操作系统'}>{`${job?.os} ${job?.os_version} (${job?.os_arch})`}</Descriptions.Item>
                    <Descriptions.Item label={'开始时间'}>{startTime.format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label={'结束时间'}>{endTime.format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                </Descriptions>
            </Col>

            <Col span={6} style={{ float: 'right', display: 'flex' }}>
                <Statistic
                    title="测试结果"
                    value={renderSuccess(job?.success)}
                    style={{
                        marginRight: '32px'
                    }}
                />

                <Statistic
                    title="已运行"
                    value={`${endTime.diff(startTime, 'minutes')} 分钟`}
                />
            </Col>
        </Row>
    );

    const [ stats, setStats ] = useState({});
    useEffect(() => {
        if (jobID) {
            refreshDataSource(() => api.getJobStats({id: jobID}), setStats);
        }
    }, [ jobID ]);

    const statsColumn = [
        {
            key: 'key',
            dataIndex: 'key',
            title: '指标名',
        },
        {
            key: 'value',
            dataIndex: 'value',
            title: '值',
        },
    ];
    const renderDetailTab = () =>  (
        <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
            <Col span={24}>
                <Card title={"统计信息"} type={'inner'}>
                    <Table
                        className="content-margin"
                        rowKey='name'
                        columns={statsColumn}
                        dataSource={Object.keys(stats).map(k => ({'key': k, 'value': stats[k]}))}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                    />
                </Card>
            </Col>

            <Col span={24}>
                <Card title={"结果文件"} type={'inner'}>
                    <iframe
                        src={`http://localhost:3080/${job?.id}/result/`}
                        style={{
                            height: '50vh',
                            width: '100%',
                            border: 'none'
                        }}
                    />
                </Card>
            </Col>
        </Row>
    );

    const [ stderr, setStderr ] = useState({});
    const [ stdout, setStdout ] = useState({});
    useEffect(() => {
        if (jobID) {
            refreshDataSource(() => api.getJobStderr({id: jobID}), setStderr);
        }
    }, [ jobID ]);
    useEffect(() => {
        if (jobID) {
            refreshDataSource(() => api.getJobStdout({id: jobID}), setStdout);
        }
    }, [ jobID ]);

    const renderOutput = output => output.split('\n')
        .map(line => <p>{line}</p>);

    const renderLog = () => (
        <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
            <Col span={24}>
                <Card title={"STDERR"} type={'inner'}>
                    <List
                        size='small'
                        bordered
                        dataSource={stderr.split('\n')}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card title={"STDOUT"} type={'inner'}>
                    <List
                        size='small'
                        bordered
                        dataSource={stdout.split('\n')}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Card>
            </Col>
        </Row>
    );

    return (
        <MenuLayout>
            <ComponentLoader isLoading={ false }>
                <PageHeader
                    onBack={() => window.history.back()}
                    title="任务详情"
                    subTitle={`ID: ${jobID}`}
                    tags={[
                        renderStatusTag(job.state),
                    ]}
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="详细信息" key="1"> { jobIsLoading? '': renderDetailTab() } </TabPane>
                            <TabPane tab="日志记录" key="2"> { renderLog() } </TabPane>
                        </Tabs>
                    }
                >
                    { renderNetworkDetailInfo() }
                </PageHeader>
            </ComponentLoader>
        </MenuLayout>
    );
};

export default JobDetailPage;
