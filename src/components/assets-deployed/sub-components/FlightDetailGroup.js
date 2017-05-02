import React, {PropTypes} from 'react'
import FlightDetailRow from './FlightDetailRow'
import styles from './FlightItemTable.css'

export default class FlightDetailGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: props.propsIsExpanded
    }

    this.handlerPlusMinusBtn = this.handlerPlusMinusBtn.bind(this)
  }

  handlerPlusMinusBtn() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const {
      propHeaderDetail,
      propListOfFlightDetail
    } = this.props

    let flightDetailList

    // Display the flight detail list only when it's expanded
    if (propListOfFlightDetail && this.state.isExpanded) {
      flightDetailList = propListOfFlightDetail.map((flightDetail, index) => (
        <FlightDetailRow
          key={index}
          propTime={flightDetail.time}
          propAgreement={flightDetail.agreement}
          propFrom={flightDetail.from}
          propTo={flightDetail.to}
          propValue={flightDetail.value}
          propCcy={flightDetail.ccy}
          propStatus={flightDetail.status}/>
      ))
    }

    return (
      <div className={styles.flightItemTableRowGroup}>
        <FlightDetailRow
          propIsGroupHeader
          propIsGroupExpanded={this.state.isExpanded}
          propTime={propHeaderDetail.time}
          propAgreement={propHeaderDetail.agreement}
          propFrom={propHeaderDetail.from}
          propTo={propHeaderDetail.to}
          propValue={propHeaderDetail.value}
          propCcy={propHeaderDetail.ccy}
          propStatus={propHeaderDetail.status}
          propHandlerExpand={this.handlerPlusMinusBtn}/>

        {flightDetailList}

      </div>
    )
  }
}

FlightDetailGroup.propTypes = {
  propHeaderDetail: PropTypes.object.isRequired,
  propListOfFlightDetail: PropTypes.array,
  propsIsExpanded: PropTypes.bool
}

FlightDetailGroup.defaultProps = {
  propListOfFlightDetail: [],
  propsIsExpanded: false
}