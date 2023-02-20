import {Button} from "antd";
import api from 'api';
import {modelColumns} from "api/model";
import {useRouter} from "next/router";
import ModelPage from "components/ModelPage/ModelPage";
import {Subject} from "rxjs";

const RepoPage = () => {
    const router = useRouter();
    const columns = [...modelColumns.repo];
    columns.push({
        key: 'actions',
        dataIndex: 'actions',
        title: '操作',
        render: (_, { name }) => {
            return (
                <Button.Group key={name}>
                    <Button onClick={() => router.push(`/repo/${name}`)}>查看详细</Button>
                </Button.Group>
            );
        }
    });

    const refresh$ = new Subject();
    return (
        <ModelPage
            columns={columns}
            dataSourceAsync={api.listRepos}

            refreshEnabled
            refreshSubject={refresh$}
        ></ModelPage>
    );
};

export default RepoPage;
