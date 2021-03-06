/**
 * Created by achalkagwad on 9/11/16.
 */
import React from 'react';
import PropTypes from 'prop-types'
import MarginAgreementDetailExpand from './MarginAgreementDetailExpand'
import {List} from 'immutable'
import {checkNegative} from '../../../utils'
import styles from '../MarginAgreementList.css'
import _ from 'lodash'


export default class MarginAgreementDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      expand: "./images/reconcile/plus.png",
      checkbox: "./images/reconcile/checkbox.png",
      cbTicked: false,
      cbLvl1: styles.show,
      pkgLvl2: styles.hide
    }
    this.handlePlusMinus = this.handlePlusMinus.bind(this)
    this.firstLevelSelect = this.firstLevelSelect.bind(this)
  }

  handlePlusMinus() {
    if (this.state.open) {
      this.setState({
        open: false,
        expand: "./images/reconcile/plus.png",
        cbLvl1: styles.show,
        pkgLvl2: styles.hide
      })
    } else {
      this.setState({
        open: true,
        expand: "./images/reconcile/minus.png",
        cbLvl1: styles.hide,
        pkgLvl2: styles.show
      })
    }
  }

  renderHidden(secondLevel, GUID, secondLevelList, parentID, onSelectSecondLevelItem) {
    if(secondLevel)
      return secondLevel.sort().map((x, index) => {

        return (
          <div key={index} className={x.get('tolerance') ? styles.packageRowHighLight : ''}>
            <div className={styles.packageLvl2 + ' ' + this.state.pkgLvl2} key={Date.now() * Math.random()}>
              {/* have second level table rendering structure here */}
              <div className={styles.packageRow}>
                <div className={styles.packageLeft}>
                  <div className={styles.packageCheckBox} onClick={(e) => {
                    this.secondLevelSelect(GUID, parentID, x.get('id'), onSelectSecondLevelItem)
                  }}>
                    <img src={this.getSecondLevelCheckboxImageUrl(secondLevelList, parentID, x.get('id'))}/>
                  </div>
                  <div className={styles.secondLevelText}>{ x.get('name') }</div>
                </div>
                <div className={styles.packageRight}>{ checkNegative(Math.round(parseFloat(x.get('amount')).toFixed(2)))}</div>
              </div>
            </div>
          </div>
        )
      })
  }

  firstLevelSelect(GUID, id, handlerSelectedItem) {
    handlerSelectedItem(GUID, id)
  }

  secondLevelSelect(GUID, parentID, id, onSelectSecondLevelItem){
    onSelectSecondLevelItem(GUID, parentID, id)
  }

  getCheckboxImageUrl(list, id, party) {

    if(!_.isEmpty(list[id])){
      // console.log(list)
      // console.log(GUID)
      // console.log(id)
      // console.log(party)
      // console.log(list[id])
      // console.log(list[id].parties)
      // console.log(_.includes(list[id].parties, party))
      if(_.includes(list[id].parties, party))
        return "./images/reconcile/checkboxwithtick.png"
    }

    return "./images/reconcile/checkbox.png"
  }

  getSecondLevelCheckboxImageUrl(list, parentID, id) {
    // console.log(list)

    if (!_.isEmpty(list[parentID])) {
      // console.log(id)
      // console.log(list[parentID][id])
      if (_.has(list[parentID], id))
        return "./images/reconcile/checkboxwithtick.png"
      else
        return "./images/reconcile/checkbox.png"
    }
    else {
      return "./images/reconcile/checkbox.png"
    }
  }

  checkChildrenTolerance(secondLevel){
    return _.some(secondLevel, {tolerance: true})
  }

  render() {

    const {
      topLevel, secondLevel, GUID,
      totalAmount, firstLevelID, handlerSelectedItem,
      firstLevelList, secondLevelList, id,
      onSelectSecondLevelItem, party,
      firstLevelTolerance
    } = this.props

    const expand = <MarginAgreementDetailExpand
      doClick={this.handlePlusMinus}
      image={this.state.expand}
    />

    // console.log(firstLevelList)

    return (

      <div className=''>

        <div className={ styles.packageRow + ' ' + ((this.checkChildrenTolerance(secondLevel.toJS()) && !this.state.open) || (secondLevel.isEmpty() && firstLevelTolerance) ? styles.packageRowHighLight : '')}> {/* one row div*/}
          <div className={styles.packageLeft}>
            <div className={styles.packageCheckBox + ' ' + this.state.cbLvl1}
                 onClick={() => this.firstLevelSelect(GUID, firstLevelID, handlerSelectedItem)}>
              <img src={this.getCheckboxImageUrl(firstLevelList, id, party)}/>
            </div>
            <div className={styles.packageText}>{topLevel}</div>

            {/*show only if second level exists*/}
            {secondLevel && !secondLevel.isEmpty() && expand}

          </div>
          <div className={styles.packageRight}>{checkNegative(Math.round(totalAmount.toFixed(2)))}</div>
        </div>

        {this.renderHidden(secondLevel, GUID, secondLevelList, id, onSelectSecondLevelItem)}
      </div>
    )
  }
}

MarginAgreementDetail.PropTypes = {
  GUID: PropTypes.string.isRequired,
  topLevel: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  secondLevel: PropTypes.instanceOf(List).isRequired,
  handlerSelectedItem: PropTypes.func.isRequired,
  isSecondLevel: PropTypes.bool.isRequired,
  checkboxImageUrl: PropTypes.string.isRequired
}
