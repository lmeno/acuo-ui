import {connect} from 'react-redux'
import {AgreementsComponent} from '../components'
import * as ACTIONS from '../actions/AgreementsActions'


const mapStateToProps = state => ({
  summaryData: state.AgreementsReducer.get('summaryData').toJS(),
  agreementsData: state.AgreementsReducer.get('agreementsData').toJS(),
  isCptySummaryExpanded: state.AgreementsReducer.get('isCptySummaryExpanded')
})

const mapDispatchToProps = dispatch => ({
  onInitAgreementSummary: (summaryData) => {
    dispatch(ACTIONS.initAgreementSummary(summaryData))
  },
  onSetCptySummaryExpanded: (isCptySummaryExpanded) => {
    dispatch(ACTIONS.setCptySummaryExpanded(isCptySummaryExpanded))
  },
  onInitAgreements: (agreementsData) => {
    dispatch(ACTIONS.initAgreements(agreementsData))
  }

})

const AgreementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreementsComponent)

export default AgreementsContainer