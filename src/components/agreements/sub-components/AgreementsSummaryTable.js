import React from 'react'
import PropTypes from 'prop-types'
import {plusBox, minuxBox} from '../../../../images/common'
import * as CONSTANTS from '../../../constants/AgreementsConstants'
import AgreementsSummaryRow from './AgreementsSummaryRow'
import styles from './AgreementsSummaryTable.css'
import transitions from './transition.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


/**
 * Three different types of row: SUMMARY_ROW_CLIENT/SUMMARY_ROW_CPTY/SUMMARY_ROW_CPTY_DETAIL
 *
 * Most properties are largely the same, except for:
 * 1) First cell on row
 * 2) key property of row
 *
 * @param rowData
 * @param rowType
 * @param propIsCptySummaryExpanded
 * @param propHandlerCptyExpand
 * @param index
 */
const createSummaryTableRow = (rowData, rowType,
                               propIsCptySummaryExpanded,
                               propHandlerCptyExpand, index) => {
  switch (rowType) {
    case CONSTANTS.SUMMARY_ROW_CLIENT:
      return <AgreementsSummaryRow rowData={rowData}>
        <div className={styles.summaryTableCell + ' ' + styles.clientDisplay}>
          {rowData.clientName}
        </div>
      </AgreementsSummaryRow>
    case CONSTANTS.SUMMARY_ROW_CPTY:
      return <AgreementsSummaryRow rowData={rowData}>
        <div className={styles.summaryTableCell + ' ' + styles.cptyDisplay}>
          <div className={styles.entityTypeContainer}>
            {rowData.clientName}
            <img src={propIsCptySummaryExpanded ?
              minuxBox : plusBox} className={styles.plusMinusStyle}
                 onClick={() =>
                   propHandlerCptyExpand(!propIsCptySummaryExpanded)}/>
          </div>
        </div>

      </AgreementsSummaryRow>
    default:
      return <AgreementsSummaryRow rowData={rowData} key={index}>
        <div className={styles.summaryTableCell}>{rowData.clientName}</div>
      </AgreementsSummaryRow>
  }
}

const AgreementsSummaryTable = ({
  propSummaryData,
  propIsCptySummaryExpanded,
  propHandlerCptyExpand,
  propIsOutgoingSelected,
  propIsIncomingSelected
}) => {
  return (
    <ReactCSSTransitionGroup
      component="div"
      className={styles.summaryTable}
      transitionName={transitions}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      <div className={styles.summaryTableHeaderRow}>
        <div className={styles.summaryTableCell}></div>
        <div className={styles.summaryTableCell}>Pending New</div>
        <div className={styles.summaryTableCell}>Pending Assigned</div>
        <div className={styles.summaryTableCell}>Rejected</div>
        <div className={styles.summaryTableCell}>Active</div>
        <div className={styles.summaryTableCell}>Change Request</div>
        <div className={styles.summaryTableCell}>Discontinued Request</div>
      </div>

      {
        propIsOutgoingSelected && propSummaryData.clientSummary &&
        createSummaryTableRow(propSummaryData.clientSummary, CONSTANTS.SUMMARY_ROW_CLIENT, null, null, null)
      }
      {
        propIsIncomingSelected && propSummaryData.cptySummary &&
        createSummaryTableRow(propSummaryData.cptySummary, CONSTANTS.SUMMARY_ROW_CPTY, propIsCptySummaryExpanded,
          propHandlerCptyExpand, null)
      }
      {
        propIsCptySummaryExpanded && propIsIncomingSelected && propSummaryData.cptySummary &&
        propSummaryData.cptySummary.cptySummaryBreakdown.map((cptyRecord, index) => (
          createSummaryTableRow(cptyRecord, CONSTANTS.SUMMARY_ROW_CPTY_DETAIL, null, null, index)
        ))
      }
      {
        (!propIsOutgoingSelected && !propIsIncomingSelected) &&
        <div className={styles.summaryTableRow}>
          <div className={styles.summaryTableCell}>No records selected</div>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}></div>
          <div className={styles.summaryTableCell}></div>
        </div>
      }
    </ReactCSSTransitionGroup>
  )
}

AgreementsSummaryTable.PropTypes = {
  propSummaryData: PropTypes.object.isRequired,
  propIsCptySummaryExpanded: PropTypes.bool.isRequired,
  propHandlerCptyExpand: PropTypes.func.isRequired,
  propIsOutgoingSelected: PropTypes.bool.isRequired,
  propIsIncomingSelected: PropTypes.bool.isRequired
}

export default AgreementsSummaryTable
