import {useRouter} from "next/router";
import {Badge, Card, Col, Descriptions, List, Row, Statistic, Table, Tabs, Tag} from "antd";
import {PageHeader} from "@ant-design/pro-layout"
import MenuLayout, {refreshDataSource} from "components/MenuLayout/MenuLayout";
import {useEffect, useState} from "react";
import api from "api";
import ComponentLoader from "components/ComponentLoader/ComponentLoader";
import moment from "moment/moment";
import {modelColumns} from "api/model";
import ModelTable from "@/components/ModelTable/ModelTable";
import Link from "next/link";
import loadable from '@loadable/component'

const ReactJson = loadable(() => import('react-json-view'))
const { TabPane } = Tabs;

const JobDetailPage = () => {
    const router = useRouter();
    const { id: planID } = router.query;

    const [ plan, setPlan ] = useState({});
    const planIsLoading = Object.keys(plan).length === 0;
    useEffect(() => {
        if (planID)
            refreshDataSource(() => api.getPlan({id: planID}), setPlan);
    }, [ planID ]);

    const renderRepoPath = repo => repo === undefined
        ? 'undefined'
        : <a href={repo}> {repo.split('/').slice(-2).join('/')} </a>;

    const [startTime, endTime] = [ moment.unix(plan?.start_time), moment.unix(plan?.end_time)];
    const renderResult = plan => {
        for (const {state} of plan?.stages || []) {
            switch (state) {
                case 'failure': return '失败'
                case 'success': continue
                default: return '执行中'
            }
        }
        return '成功'
    }
    const renderNetworkDetailInfo = () => (
        <Row>
            <Col span={18}>
                <Descriptions>
                    <Descriptions.Item label={'计划名称'}>{plan?.name}</Descriptions.Item>
                    <Descriptions.Item label={'仓库提交ID'}>{plan?.commit?.repo.slice(10)}</Descriptions.Item>
                    <Descriptions.Item label={'元仓库提交ID'}>{plan?.commit?.meta.slice(10)}</Descriptions.Item>
                    <Descriptions.Item label={'测试仓库'}>{renderRepoPath(plan?.repository)}</Descriptions.Item>
                    <Descriptions.Item label={'PKGBUILD'}>{renderRepoPath(plan?.PKGBUILD)}</Descriptions.Item>
                    <Descriptions.Item label={'阶段数'}>{plan?.stages?.length}</Descriptions.Item>
                    <Descriptions.Item label={'开始时间'}>{startTime.format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label={'结束时间'}>{endTime.format('YYYY-MM-DD hh:mm:ss')}</Descriptions.Item>
                </Descriptions>
            </Col>

            <Col span={6} style={{ float: 'right', display: 'flex' }}>
                <Statistic
                    title="测试结果"
                    value={renderResult(plan)}
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

    const jobColumns = [...modelColumns.job];
    const idCol = jobColumns.find(col => col.key === 'id');
    idCol.render = id => <Link href={`/job/${id}`}> { id } </Link>

    const renderDetailTab = () =>  (
        <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
            {
                plan.stages.map(stage => (
                    <Col span={24}>
                        <Card title={stage.name.toUpperCase()} type={'inner'}>
                            <ModelTable
                                columns={modelColumns.job}
                                dataSourceAsync={
                                    () => api.listJobsByPlanStage({planID, 'stageName': stage.name})
                                }
                            />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );

    const renderLog = () => (
        <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
            <Col span={24}>
                <Card title={"STDERR"} type={'inner'}>
                </Card>
            </Col>
            <Col span={24}>
                <Card title={"STDOUT"} type={'inner'}>
                </Card>
            </Col>
        </Row>
    );

    return (
        <MenuLayout>
            <ComponentLoader isLoading={ false }>
                <PageHeader
                    onBack={() => window.history.back()}
                    title="计划详情"
                    subTitle={`ID: ${planID}`}
                    tags={[]}
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="阶段任务" key="1"> { planIsLoading? '': renderDetailTab() } </TabPane>
                            <TabPane tab="原始数据" key="2"> { <ReactJson src={plan} name={false}/> } </TabPane>
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
