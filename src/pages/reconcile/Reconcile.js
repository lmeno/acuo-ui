import React from 'react'
import _ from 'lodash'
import {
  FilterReconPageContainer,
  MarginAgreementListContainer,
  NavigationBarContainer
} from '../../containers'
import filterItems from '../../utils/filterItems'
import stylesG from '../../static/global.css'
import styles from './Reconcile.css'
import { connect } from 'react-redux'
import { onInitReconState } from '../../actions'
import { RECON_URL } from '../../constants/APIcalls'
import { hashHistory } from 'react-router'



// =============================================================================
// redux
const mapStateToProps = state => {
  const filters = state.ReconReducer.get('filters').toJS()
  const items   = state.ReconReducer.get('items').toJS()

  const filteredItems = filterItems(items, filters)
  // const outItems = _.filter(filteredItems, ['direction', 'OUT'])
  // console.log("Filtered Items :::", filteredItems);
  return {
    outItems: filteredItems,
  }
}

// =============================================================================
// redux
class Reconcile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    if(localStorage.loginAt == undefined || localStorage.loginAt < Date.now()){ hashHistory.push('/') }
    this.props.initRecon()
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    if(localStorage.loginAt < Date.now()){ hashHistory.push("/") }

  }

  render() {
    const { outItems } = this.props

    return (
      <div className={stylesG.globalStyles}>
        <NavigationBarContainer curPage={this.props.location.pathname} />
        <div className={styles.titleBar}>
          <div className={styles.title}>{outItems.filter(x=>x.status.toLowerCase() !== 'expected').length} Actions to reconcile</div>
          <div className={styles.titleTriangle}></div>
        </div>
        <FilterReconPageContainer />
        <MarginAgreementListContainer />
      </div>
    )
  }
}

// =============================================================================
// connect component with redux

const mapDispatchToProps = dispatch => {
  // dispatch(onInitReconState())
  return {
    initRecon: () => {
      dispatch(onInitReconState())
    }
  }
}

const ReconcileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reconcile)

export {ReconcileContainer}
