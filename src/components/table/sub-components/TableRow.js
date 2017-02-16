import React from 'react'
import TableCell from './TableCell'
import * as DASHBOARD_CONSTANTS from '../../../constants/DashboardTable'
import styles from '../Table.css'
import selfStyles from './TableRow.css'
import { numberWithCommas } from '../../../utils'
import { hashHistory } from 'react-router'

class TableRow extends React.Component {
  constructor(props) {
    super(props)
  }

  checkNegative(orgAmount, numbersWithCommas){
    const amount = parseFloat(orgAmount)

    if(amount < 0)
      return '(' + numbersWithCommas(Math.abs(amount || 0)) + ')'
    else
      return numbersWithCommas(amount || 0)
  }

  getDirectionCell(directionText) {
    let directionCell
    switch (directionText) {
      case DASHBOARD_CONSTANTS.DIRECTION_IN:
        directionCell =
          <div className={selfStyles.directionCont + " " + selfStyles.directionIn}>
            {directionText}
          </div>
        break;
      case DASHBOARD_CONSTANTS.DIRECTION_OUT:
        directionCell =
          <div className={selfStyles.directionCont + " " + selfStyles.directionOut}>
            {directionText}
          </div>
    }
    return directionCell
  }

  getStatusCell(statusCode) {
    let statusCell
    switch (statusCode) {
      case DASHBOARD_CONSTANTS.STATUS_CODE_EXPECTED:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusExpected}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_RECON:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusRecon}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_UNRECON:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusUnrecon}>
            {statusCode}
          </div>
        break
      case DASHBOARD_CONSTANTS.STATUS_CODE_DISPUTE:
        statusCell =
          <div className={selfStyles.statusCont + ' ' + selfStyles.statusDispute}>
            {statusCode}
          </div>

    }
    return statusCell
  }

  getHoverbility(directionText, statusCode){
    if ((statusCode == DASHBOARD_CONSTANTS.STATUS_CODE_EXPECTED || statusCode == DASHBOARD_CONSTANTS.STATUS_CODE_UNRECON) && (directionText == DASHBOARD_CONSTANTS.DIRECTION_OUT))
      return true
    else return false
  }

  lineItemClick(hoverbility, onLineItemClick, hashHistory, cptyEntity, status, notificationTime, type, legalEntity, cptyOrg){
    if(hoverbility){
      onLineItemClick(type, status, notificationTime, cptyEntity, legalEntity, cptyOrg)
      hashHistory.push('recon')
    }

  }

  render() {
    const { rowItems, onLineItemClick } = this.props
    const excess =
      (
        parseInt(rowItems.collateralBalance ? rowItems.collateralBalance : 0) +
        parseInt(rowItems.pendingCollateral ? rowItems.pendingCollateral : 0)
      )
      -
      (
        parseInt(rowItems.variableMargin ? rowItems.variableMargin : 0) +
        parseInt(rowItems.initialMargin ? rowItems.initialMargin : 0)
      )

    const directionText = rowItems.direction
    // Get only first letter of status for display of color
    const statusCode = rowItems.status.substring(0,1).toUpperCase()

    let directionCell = this.getDirectionCell(directionText)
    let statusCell = this.getStatusCell(statusCode)
    let hoverbility = this.getHoverbility(directionText, statusCode)

    return (
      <div className={styles.tableRow + ' ' + (hoverbility ? selfStyles.hoverable : '')} onClick={() => this.lineItemClick(hoverbility, onLineItemClick, hashHistory, rowItems.cptyEntity, rowItems.status, rowItems.notificationTime, rowItems.type, rowItems.legalEntity, rowItems.cptyOrg)}>
        <TableCell cellValue={rowItems.legalEntity}/>
        <TableCell cellValue={rowItems.cptyOrg}/>
        <TableCell cellValue={rowItems.cptyEntity}/>
        <TableCell cellValue={rowItems.ccy}/>
        <TableCell cellValue={this.checkNegative(rowItems.initialMargin, numberWithCommas)}/>
        <TableCell cellValue={this.checkNegative(rowItems.variableMargin, numberWithCommas)}/>
        <TableCell cellValue={this.checkNegative(excess, numberWithCommas)}/>
        <TableCell cellValue={directionCell}/>
        <TableCell cellValue={statusCell}/>
      </div>
    )
  }
}

export default TableRow
