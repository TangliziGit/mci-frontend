import Api from "./api";

const api = {
  // ==================== job ====================
  listJobs: () =>
      Api('GET', `/api/job`).done(),

  getJob: ({id}) =>
      Api('GET', `/api/job/${id}`)
          .done(),

  // TODO: make webdav host & port separated
  getJobStats: ({id}) =>
      Api('GET', `http://localhost:3080/${id}/result/stats.json`)
          .done(),

  getJobStderr: ({id}) =>
      Api('GET', `http://localhost:3080/${id}/result/lkp-stderr`)
          .done(),

  getJobStdout: ({id}) =>
      Api('GET', `http://localhost:3080/${id}/result/lkp-stdout`)
          .done(),

  // ==================== plan ====================
  listPlans: () =>
      Api('GET', `/api/plan`).done(),

  getPlan: ({id}) =>
      Api('GET', `/api/plan/${id}`)
          .done(),

  listJobsByPlanStage: ({planID, stageName}) =>
      Api('GET', `/api/plan/${planID}/stage/${stageName}/job`)
          .done(),

  // ==================== machine ====================
  listMachines: () =>
      Api('GET', `/api/machine`).done(),

}

export default api;
