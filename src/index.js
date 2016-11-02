import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import { browserHistory, Router, Route, Link } from 'react-router'
import reducer from './reducer'
import {initState} from './action_creators'

import styles from './global.css'

import Nav from './components/shared/navbar/navbar'
import UploadPortfolio from './components/dashboard/uploadPortfolio/upload_portfolio'
import {FilterContainer} from './components/dashboard/filters/filter'
import Dashboard from './components/dashboard/dashboard'
import Reconcile from './components/reconcile/reconcile'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component{
    constructor(props){
        super(props)

        fetch('http://localhost:3000/data').then((response) => {
            return response.json()
        }).then((obj) => {
            store.dispatch(initState(fromJS(obj)))
        })
    }

    render(){
        return (
            <Provider store={store}>
                <div className={styles.globalStyles}>
                    <Nav />
                    <UploadPortfolio />
                    <FilterContainer  />
                    <Router history={browserHistory}>
                        <Route path="/" component={Dashboard} />
                        <Route path="recon" component={Reconcile} />
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render((
    <App />
  ),document.getElementById('app'))
