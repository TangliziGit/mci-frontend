import {Button} from "antd";
import api from 'api';
import {modelColumns} from "api/model";
import {useRouter} from "next/router";
import ModelPage from "components/ModelPage/ModelPage";
import {Subject} from "rxjs";

const MachinePage = () => {
    const router = useRouter();
    const refresh$ = new Subject();
    return (
        <ModelPage
            columns={modelColumns.machine}
            dataSourceAsync={api.listMachines}

            refreshEnabled
            refreshSubject={refresh$}
        ></ModelPage>
    );
};

export default MachinePage;
