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

  // ==================== user ====================
  listUsers: () =>
      Api('GET', `/api/user`).done(),

  createUser: (user) =>
      Api('POST', `/api/user`)
          .body(user)
          .done(),

  deleteUser: (userID) =>
      Api('DELETE', `/api/user`)
          .body(userID)
          .done(),

  listUsersByNetwork: (networkID) =>
      Api('GET', `/api/user`)
          .query(networkID)
          .done(),


  // ==================== channel ====================
  getChannel: ({id}) =>
      Api('GET', `/api/channel/${id}`)
          .done(),

  listChannels: () =>
      Api('GET', `/api/channel`).done(),

  createChannel: (channel) =>
      Api('POST', `/api/channel`)
          .body(channel)
          .done(),

  listChannelsByNetwork: (networkID) =>
      Api('GET', `/api/channel`)
          .query(networkID)
          .done(),


  // ==================== organization ====================
  listOrganizations: () =>
      Api('GET', `/api/organization`).done(),

  createOrganization: (organization) =>
      Api('POST', `/api/organization`)
          .body(organization)
          .done(),

  listOrganizationsByNetwork: (networkID) =>
      Api('GET', `/api/organization`)
          .query(networkID)
          .done(),


  // ==================== chaincode ====================
  listChaincodes: () =>
      Api('GET', `/api/chaincode`).done(),

  listChaincodesByNetwork: (networkID) =>
      Api('GET', `/api/chaincode`)
          .query(networkID)
          .done(),

  // TODO: handle the proxy error
  // [HPM] Error occurred while trying to proxy request /api/chaincode from localhost:3000 to http://k8s:32323/ (ECONNRESET) (https://nodejs.org/api/errors.html#errors_common_system_errors)I
  createChaincode: (chaincode) =>
      Api('POST', `/api/chaincode`)
          .body(chaincode)
          .done(),

  invokeChaincode: (invokeReq) =>
      Api('POST', `/api/chaincode/transaction`)
          .body(invokeReq)
          .done(),

  listChaincodeTransactions: () =>
      Api('GET', `/api/chaincode/transaction`)
          .done(),

  getChaincodeTransaction: ({id}) =>
      Api('GET', `/api/chaincode/transaction/${id}`)
          .done(),

  deleteChaincodeTransaction: (ids) =>
      Api('DELETE', `/api/chaincode/transaction/`)
          .body(ids)
          .done(),


  // ==================== peer ====================

  listPeersByOrganization: (organizationID) =>
      Api('GET', `/api/peer`)
          .query(organizationID)
          .done(),


  // ==================== monitor ====================
  listBlocksByChannelIdWithPage: (channelIDWithPage) =>
      Api('GET', `/api/block`)
          .query(channelIDWithPage)
          .done(),

  // ==================== monitor ====================

  monitorByQuery: (query) =>
      Api('GET', `/monitor/query`)
          .query(query)
          .done(),

  monitorByQueryRange: (query) =>
      Api('GET', `/monitor/query_range`)
          .query(query)
          .done(),
}

export default api;
