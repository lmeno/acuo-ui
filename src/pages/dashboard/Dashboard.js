import React from 'react'
import {UploadPortfolioButton} from '../../components'
import {
  FilterContainer,
  TableContainer,
  GraphContainer,
  NavigationBarContainer
} from '../../containers'
import { connect } from 'react-redux'
import styles from './Dashboard.css'
import SortableSimple from '../../components/dnd-test'
import { initState } from '../../actions'
import { DASHBOARD_URL } from '../../constants/APIcalls'
import { fromJS } from 'immutable'

export class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.props.initDashboard()
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <NavigationBarContainer curPage={this.props.location.pathname}/>
        <UploadPortfolioButton />
        <div className={styles.filterGraphContainer}>
          <FilterContainer/>
          <GraphContainer />
        </div>
        <TableContainer />
        <SortableSimple />
      </div>
    )
  }
}

// =============================================================================
// connect component with redux

const mapStateToProps = state => {
  return { test: 0 }
}

const mapDispatchToProps = dispatch => ({
  initDashboard: () => {
    fetch(DASHBOARD_URL).then((response) => {
      return response.json()
    }).then((obj) => {
      dispatch(initState(fromJS(obj)))
    })
  }
})

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export {DashboardContainer}