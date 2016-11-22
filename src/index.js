import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {Provider} from 'react-redux'
import { browserHistory, Router, Route, Link } from 'react-router'
import reducer from './reducer'
import {initState} from './action_creators'

import styles from './global.css'

import Dashboard from './components/dashboard/dashboard'
import { ReconcileContainer } from './components/reconcile/reconcile'
import Pledge from './components/pledge/pledge'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component{
    constructor(props){
        super(props)
        //http://localhost:3000/data
        //https://acuo.herokuapp.com/json
        fetch('https://acuo.herokuapp.com/json').then((response) => {
            return response.json()
        }).then((obj) => {
            store.dispatch(initState(fromJS(obj)))
        })
    }

    render(){
        return (
            <Provider store={store}>
                <div className={styles.globalStyles}>
                    <Router history={browserHistory}>
                        <Route path="/" component={Dashboard} />
                        <Route path="recon" component={ReconcileContainer} />
                        <Route path="pledge" component={Pledge} />
                    </Router>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render((
    <App />
  ),document.getElementById('app'))
