import React from 'react'
import ExclamationIcon from '../../../../images/dispute/Exclamation.svg'
import {formatDate} from '../../../utils/'
import styles from './DisputeTable.css'


const DisputeTableRow = ({
  propRole,
  propLegalEntity,
  propCptyOrg,
  propCptyEntity,
  propAgreementName,
  propId,
  propDaysOpened,
  propLastUpdated,
  propStatus
}) => {
  let roleIconDom
  switch (propRole) {
    case 'S':
      roleIconDom =
        <div className={styles.roleIcon}>{propRole}</div>
      break;
    case 'P':
      roleIconDom =
        <div className={styles.roleIcon + ' ' + styles.roleIconTwo}>{propRole}</div>
      break;
    default:
      roleIconDom =
        <div className={styles.disputeTableCell}>{propRole}</div>
  }
  return (
    <div className={styles.disputeTableRow}>
      <div className={styles.disputeTableCell}>
        {roleIconDom}
      </div>
      <div className={styles.disputeTableCell}>{propLegalEntity}</div>
      <div className={styles.disputeTableCell}>{propCptyOrg}</div>
      <div className={styles.disputeTableCell}>{propCptyEntity}</div>
      <div className={styles.disputeTableCell}>{propAgreementName}</div>
      <div className={styles.disputeTableCell}>{propId}</div>
      <div className={styles.disputeTableCell}>{propDaysOpened}</div>
      <div className={styles.disputeTableCell}>{formatDate(propLastUpdated)}</div>
      <div className={styles.disputeTableCell}>{propStatus}</div>
      <div className={styles.disputeTableCell}><img src={ExclamationIcon}/></div>
      <div className={styles.disputeTableCell + ' ' + styles.downArrow}></div>
    </div>

  )
}

export default DisputeTableRow