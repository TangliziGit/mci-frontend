import {useRouter} from "next/router";
import {Card, Col, Descriptions, Row, Statistic, Tabs} from "antd";
import {PageHeader} from "@ant-design/pro-layout"
import MenuLayout, {refreshDataSource} from "components/MenuLayout/MenuLayout";
import {useEffect, useState} from "react";
import api from "api";
import ComponentLoader from "components/ComponentLoader/ComponentLoader";
import {modelColumns} from "@/api/model";
import ModelTable from "@/components/ModelTable/ModelTable";

const { TabPane } = Tabs;

const JobDetailPage = () => {
    const router = useRouter();
    const { name: repoName } = router.query;

    const [ repo, setRepo ] = useState({});
    const repoIsLoading = Object.keys(repo).length === 0;
    useEffect(() => {
        if (repoName)
            refreshDataSource(() => api.getRepo({name: repoName}), setRepo);
    }, [ repoName ]);

    const renderRepoPath = repo => repo === undefined
        ? 'undefined'
        : <a href={repo}> {repo.split('/').slice(-2).join('/')} </a>;

    const renderRepoInfo = () => (
        <Row>
            <Col span={18}>
                <Descriptions>
                    <Descriptions.Item label={'测试名称'}>{repo?.name}</Descriptions.Item>
                    <Descriptions.Item label={'测试仓库'}>{renderRepoPath(repo?.repository)}</Descriptions.Item>
                    <Descriptions.Item label={'测试任务数'}>{repo?.job_count}</Descriptions.Item>
                    <Descriptions.Item label={'测试计划数'}>{repo?.plan_count}</Descriptions.Item>
                </Descriptions>
            </Col>

            <Col span={6} style={{ float: 'right', display: 'flex' }}>
                <Statistic
                    title="成功率"
                    value={`${(repo?.success_rate * 100).toFixed(2)} %`}
                    style={{
                        marginRight: '32px'
                    }}
                />

                <Statistic
                    title="平均测试秒数"
                    value={`${repo?.avg_duration.toFixed(2)}`}
                />
            </Col>
        </Row>
    );

    const renderDetailTab = () =>  (
        <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
            <Col span={24}>
                <Card title={'附属测试计划'} type={'inner'}>
                    <ModelTable
                        columns={modelColumns.plan}
                        dataSourceAsync={
                            () => api.listPlansByRepoName({repoName})
                        }
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
                    title="仓库详情"
                    subTitle={`名称: ${repoName}`}
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="相关信息" key="1"> { repoIsLoading? '': renderDetailTab() } </TabPane>
                        </Tabs>
                    }
                >
                    { renderRepoInfo() }
                </PageHeader>
            </ComponentLoader>
        </MenuLayout>
    );
};

export default JobDetailPage;
