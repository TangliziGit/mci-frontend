import Api from "./api";

const api = {
  // ==================== job ====================
  listJobs: () =>
      Api('GET', `/api/job`).done(),

  getJob: ({id}) =>
      Api('GET', `/api/job/${id}`)
          .done(),

  getJobStats: ({id}) =>
      Api('GET', `/${id}/result/stats.json`)
          .done(),

  getJobStderr: ({id}) =>
      Api('GET', `/${id}/result/lkp-stderr`)
          .done(),

  getJobStdout: ({id}) =>
      Api('GET', `/${id}/result/lkp-stdout`)
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

  // ==================== repository ====================
  listRepos: () =>
      Api('GET', `/api/repo`).done(),

  getRepo: ({name}) =>
      Api('GET', `/api/repo/${name}`)
          .done(),

  listPlansByRepoName: ({repoName}) =>
      Api('GET', `/api/repo/${repoName}/plan`)
          .done(),
}

export default api;
