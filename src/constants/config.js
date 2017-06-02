const DEV_URL = 'http://dev.acuo.com:8181'
const UBUNTU_URL = 'http://52.74.186.112:8081'

const config = {
  dev: {
    DASHBOARD_URL: DEV_URL + '/dashboard',
    RECON_URL: DEV_URL + '/recon/new',
    OPTIMISATION_URL: DEV_URL + '/pledge/optimization',
    COLLATERAL_URL: DEV_URL + '/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: DEV_URL + '/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: DEV_URL + '/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: DEV_URL + '/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: DEV_URL + '/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: DEV_URL + '/unmatched',
    SEND_RECON_DISPUTE_URL: DEV_URL + '/recon/disputeStatement',
    PLEDGE_REMOVE_ALLOCATED_ASSET: DEV_URL + '/pledge/remove-allocated-asset',
    FETCH_GENERATED_PORTFOLIO: 'http://valuation.acuo.com/acuo/api/calls/async/generate/',
    FETCH_DEPLOYED_DEPARTURES: 'http://margin.acuo.com/acuo/api/pledge/assets/all',
    POST_MARGIN_CALL_IDS: 'http://margin.acuo.com/acuo/api/margin/send/calls',
    PROXY_HEALTH_CHECK: DEV_URL + '/common/check-connectivity',
    MARGIN_HEALTH_CHECK: 'http://margin.acuo.com/acuo/admin/ping',
    VALUATION_HEALTH_CHECK: 'http://valuation.acuo.com/acuo/admin/ping',
    COLLATERAL_HEALTH_CHECK: 'http://collateral.acuo.com/acuo/admin/ping',
    FETCH_NAVBAR_ALERTS: 'http://margin.acuo.com/acuo/api/dashboard/menu'
  },
  local: {
    DASHBOARD_URL: UBUNTU_URL + '/dashboard',
    RECON_URL: UBUNTU_URL + '/recon/new',
    OPTIMISATION_URL: UBUNTU_URL + '/pledge/optimization',
    COLLATERAL_URL: UBUNTU_URL + '/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: UBUNTU_URL + '/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: UBUNTU_URL + '/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: UBUNTU_URL + '/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: UBUNTU_URL + '/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: UBUNTU_URL + '/unmatched',
    SEND_RECON_DISPUTE_URL: UBUNTU_URL + '/recon/disputeStatement',
    PLEDGE_REMOVE_ALLOCATED_ASSET: UBUNTU_URL + '/pledge/remove-allocated-asset'
  },
  qa: {
    DASHBOARD_URL: 'http://qa.acuo.com:8181/dashboard',
    RECON_URL: 'http://qa.acuo.com:8181/recon/new',
    OPTIMISATION_URL: 'http://qa.acuo.com:8181/pledge/optimization',
    COLLATERAL_URL: 'http://qa.acuo.com:8181/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://qa.acuo.com:8181/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://qa.acuo.com:8181/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://qa.acuo.com:8181/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://qa.acuo.com:8181/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://qa.acuo.com:9090/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://qa.acuo.com:7070/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://qa.acuo.com:8181/unmatched',
    SEND_RECON_DISPUTE_URL: 'http://qa.acuo.com:8181/recon/disputeStatement',
    PLEDGE_REMOVE_ALLOCATED_ASSET: 'http://qa.acuo.com:8181/pledge/remove-allocated-asset',
    FETCH_GENERATED_PORTFOLIO: 'http://qa.acuo.com:9090/acuo/api/calls/async/generate/',
    FETCH_DEPLOYED_DEPARTURES: 'http://qa.acuo.com:7070/acuo/api/pledge/assets/all',
    POST_MARGIN_CALL_IDS: 'http://qa.acuo.com:7070/acuo/api/margin/send/calls',
    PROXY_HEALTH_CHECK: 'http://qa.acuo.com:8181/common/check-connectivity',
    MARGIN_HEALTH_CHECK: 'http://qa.acuo.com:7070/acuo/admin/ping',
    VALUATION_HEALTH_CHECK: 'http://qa.acuo.com:9090/acuo/admin/ping',
    COLLATERAL_HEALTH_CHECK: 'http://qa.acuo.com:8080/acuo/admin/ping',
    FETCH_NAVBAR_ALERTS: 'http://qa.acuo.com:7070/acuo/api/dashboard/menu'
  },
  prod: {},
  test: {
    DASHBOARD_URL: 'http://localhost:8081/dashboard',
    RECON_URL: 'http://localhost:8081/recon/new',
    OPTIMISATION_URL: 'http://localhost:8081/pledge/optimization',
    COLLATERAL_URL: 'http://localhost:8081/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://localhost:8081/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://localhost:8081/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://localhost:8081/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://localhost:8081/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://localhost:8081/unmatched',
    PLEDGE_REMOVE_ALLOCATED_ASSET: 'http://localhost:8081/pledge/remove-allocated-asset',
    FETCH_GENERATED_PORTFOLIO: 'http://valuation.acuo.com/acuo/api/calls/async/generate/',
    FETCH_DEPLOYED_DEPARTURES: 'http://margin.acuo.com/acuo/api/pledge/assets/all',
    POST_MARGIN_CALL_IDS: 'http://margin.acuo.com/acuo/api/margin/send/calls',
  }
}

exports.get = (env) => {
  // console.log('config')
  // console.log(`config env: ${env}`)
  // console.log(process)
  // console.log(process.env)
  // console.log(process.env.DOCKER_ENV)
  console.log('Current config environment accessed is ' + (env || 'dev'))
  return config[env] || config.dev
}
