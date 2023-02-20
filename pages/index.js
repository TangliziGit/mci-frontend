import MenuLayout, {refreshDataSource} from "components/MenuLayout/MenuLayout";
import {Card, Col, Row} from 'antd';
import { EChart } from '@hcorta/react-echarts'
import ModelTable from "@/components/ModelTable/ModelTable";
import {modelColumns} from "@/api/model";
import api from "@/api";
import Link from "next/link";
import RecentModelTable from "@/components/RecentModelTable/RecentModelTable";
import {useEffect, useState} from "react";
import moment from "moment";

export default function Index() {
    const grid = { x: 50, y: 10, x2: 20, y2: 25 };
    const [ jobs, setJobs ] = useState([]);

    useEffect(() => {
        refreshDataSource(api.listJobs, setJobs);
    }, []);

    const renderRecentJobNumber = () => {
        const times = [];
        const counts = [];
        for (let i = 5; i >= 0; i--) {
            const startTimeLeft = moment().subtract(i+1, 'hours').unix();
            const startTimeRight = moment().subtract(i, 'hours').unix();
            const count = jobs.filter(job => {
                return startTimeLeft < job.start_time && job.start_time <= startTimeRight;
            }).length;

            times.push(`${i+1}H内`);
            counts.push(count);
        }

        return <EChart
            grid={grid}
            xAxis={{
                type: 'category',
                data: times
            }}
            yAxis={{
                type: 'value'
            }}
            series={[{
                data: counts,
                type: 'line',
                smooth: true
            }]}
        />
    };

    const renderRecentPlans = () => {
        const filter = [ 'id', 'name', 'repository', 'stages' ];
        const columns = modelColumns.plan.filter(col => filter.indexOf(col.key) > -1);
        const idCol = columns.find(col => col.key === 'id');
        idCol.render = id => <Link href={`/plan/${id}`}>{id}</Link>;
        return <RecentModelTable
            columns={columns}
            dataSourceAsync={api.listPlans}
            count={5}
            timeColumn={'start_time'}
        />
    };

    const renderRecentJobs = () => {
        const filter = [ 'id', 'suite', 'stage', 'state', 'success' ];
        const columns = modelColumns.job.filter(col => filter.indexOf(col.key) > -1);
        const idCol = columns.find(col => col.key === 'id');
        idCol.render = id => <Link href={`/job/${id}`}>{id}</Link>;
        return <RecentModelTable
            columns={columns}
            dataSourceAsync={api.listJobs}
            count={5}
            timeColumn={'start_time'}
        />
    };

    const renderArchStat = () => {
        const count = { 'x86_64': 0, 'aarch64': 0 };
        for (const job of jobs) {
            count[job.os_arch] += 1;
        }

        const data = Object.keys(count).map(key => ({ value: count[key], name: key }));
        return <EChart
            grid={grid}
            tooltip={{ trigger: 'item' }}
            legend={{ top: '5%', left: 'center' }}
            series={[{
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: { show: false },
                data: data
            }
        ]}
        />
    };

    const renderMachineState = () => {
        const filter = [ 'id', 'arch', 'status', 'state' ];
        const columns = modelColumns.machine.filter(col => filter.indexOf(col.key) > -1);
        const macCol = columns.find(col => col.key === 'id');
        macCol.render = mac => <Link href={`/machine/${mac}`}>{mac}</Link>;
        return <ModelTable
            columns={columns}
            dataSourceAsync={api.listMachines}
            showPagination={false}
        />
    };

    return (
        <MenuLayout>
            <Row gutter={[24, 18]} style={{ marginTop: '32px' }}>
                <Col span={24}>
                    <Card title={"6小时内测试任务数量"} type='inner'>
                        { renderRecentJobNumber() }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={"近期测试计划"} type='inner'>
                        { renderRecentPlans() }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={"近期测试任务"} type='inner'>
                        { renderRecentJobs() }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={"CPU架构统计"} type='inner'>
                        { renderArchStat() }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={"测试机状态"} type='inner'>
                        { renderMachineState() }
                    </Card>
                </Col>
            </Row>
        </MenuLayout>
    );
}
