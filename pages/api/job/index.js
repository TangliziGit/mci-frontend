import {jobSource} from "../index";
import moment from "moment";
export default (req, res) => {
    const { method } = req;

    const jobs = [...jobSource];
    const maxStartTime = jobs.reduce((acc, job) => Math.max(acc, job.start_time), 0);
    const offset = moment().unix() - maxStartTime + 60 * 60;
    for (const job of jobs) {
        job.start_time = parseInt(job.start_time) + offset;
        job.end_time = parseInt(job.end_time) + offset;
    }

    switch (method) {
        case 'GET':
            res.status(200)
                .json({payload: jobs});
            break;
    }
}
