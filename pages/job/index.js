import {Button} from "antd";
import api from 'api';
import {modelColumns} from "api/model";
import {useRouter} from "next/router";
import ModelPage from "components/ModelPage/ModelPage";
import {Subject} from "rxjs";

const JobPage = () => {
    const router = useRouter();
    const columns = [...modelColumns.job];
    columns.push({
        key: 'actions',
        dataIndex: 'actions',
        title: '操作',
        render: (_, { id: jobID, plan: planID }) => {
            // TODO: jump to plan
            return (
                <Button.Group key={jobID}>
                    <Button onClick={() => router.push(`/job/${jobID}`)}>查看详细</Button>
                    <Button onClick={() => router.push(`/plan/${planID}`)} type="primary">查看计划</Button>
                </Button.Group>
            );
        }
    });

    const refresh$ = new Subject();
    return (
        <ModelPage
            columns={columns}
            dataSourceAsync={api.listJobs}

            refreshEnabled
            refreshSubject={refresh$}
        ></ModelPage>
    );
};

export default JobPage;
