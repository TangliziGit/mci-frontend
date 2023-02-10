import {Button} from "antd";
import api from 'api';
import {modelColumns} from "api/model";
import {useRouter} from "next/router";
import ModelPage from "components/ModelPage/ModelPage";
import {Subject} from "rxjs";

const PlanPage = () => {
    const router = useRouter();
    const columns = [...modelColumns.plan];
    columns.push({
        key: 'actions',
        dataIndex: 'actions',
        title: '操作',
        render: (_, { id: planID }) => {
            return (
                <Button.Group key={planID}>
                    <Button onClick={() => router.push(`/plan/${planID}`)}>查看详细</Button>
                </Button.Group>
            );
        }
    });

    const refresh$ = new Subject();
    return (
        <ModelPage
            columns={columns}
            dataSourceAsync={api.listPlans}

            refreshEnabled
            refreshSubject={refresh$}
        ></ModelPage>
    );
};

export default PlanPage;
