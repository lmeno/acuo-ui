import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import {hashHistory, Router, Route} from 'react-router'
import reducer from './reducers'
import {initState, reconInitState} from './actions'
import styles from './static/global.css'
import {
  Dashboard,
  ReconcileContainer,
  PledgePage,
  UploadPortfolioPage,
  DeployedPage
} from './pages'
import { DASHBOARD_URL, RECON_URL } from './constants/APIcalls'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component {
  constructor(props) {
    super(props)
    //http://localhost:3000/data
    //https://acuo.herokuapp.com/json
    fetch(DASHBOARD_URL).then((response) => {
      return response.json()
    }).then((obj) => {
      store.dispatch(initState(fromJS(obj)))
    })

    fetch(RECON_URL).then((response) => {
      return response.json()
    }).then((obj) => {
      const {items} = obj
      store.dispatch(reconInitState(items))
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className={styles.globalStyles}>
          <Router history={hashHistory}>
            <Route path="/" component={Dashboard}/>
            <Route path="recon" component={ReconcileContainer}/>
            <Route path="pledge" component={PledgePage}/>
            <Route path="upload_portfolio" component={UploadPortfolioPage}/>
            <Route path="deployed" component={DeployedPage}/>
          </Router>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('app'))
