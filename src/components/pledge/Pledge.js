/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import styles from './Pledge.css'
import OptItem from './sub-components/OptItem'
import ChooseCalls from './sub-components/ChooseCalls'
import Selection from '../pledge-selection/Selection'
import CollateralAssetGroup from './sub-components/CollateralAssetGroup'

import { List } from 'immutable'

class Pledge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      class: styles.sectionOpen,
      dropdown: "./../../../images/pledge/minusbox.png",

      toggleColwidthL: styles.expandDivL, 
      toggleColwidthR: styles.minDivR,

      toggleHideCol: styles.showCol,
      toggleShowHideL : false, 
      toggleShowHideR : true,
      sideways: "./../../../images/pledge/sideways-min.png",
      selectionSideway: "./../../../images/pledge/sideways-max.png",
      chsCallsTickState: 'None',
      checkbox: "./images/pledge/checkbox.png",
      selTickBox: 'none'
    }
    this.handlePlusMinus = this.handlePlusMinus.bind(this)
    this.changeSideways = this.changeSideways.bind(this)
    // this.renderCollateralItems = this.renderCollateralItems.bind(this)

    fetch('http://52.74.186.112:8081/optimisation').then(response => {
      return response.json()
    }).then(obj => {
      this.props.onInitOptimisationSettings(obj)
    })

    fetch('http://52.74.186.112:8081/init-selection').then(response => {
      return response.json()
    }).then(obj => {
      this.props.initSelection(obj)
    })
  }

  changeSideways() {
    if (this.state.open) {
      this.setState({
        open: false,
        toggleShowHideL : true,
        toggleShowHideR : false,
        toggleColwidthL: styles.expandDivL,
        toggleColwidthR: styles.minDivR,
        toggleHideCol: styles.hideCol,
        sideways: "./../../../images/pledge/sideways-max.png",
        selectionSideway: "./../../../images/pledge/sideways-min.png",
      })
    } else {
      this.setState({
        open: true,
        toggleColwidthL: styles.minDivL,
        toggleColwidthR: styles.expandDivR,
        toggleHideCol: styles.showCol,
        toggleShowHideL : false,
        toggleShowHideR : true,
        sideways: "./../../../images/pledge/sideways-min.png",
        selectionSideway: "./../../../images/pledge/sideways-max.png",
      })
    }
  }

  handlePlusMinus() {
    if (this.state.open) {
      this.setState({
        open: false,
        class: styles.sectionClose,
        dropdown: "./../../../images/pledge/plusbox.png"
      })
    } else {
      this.setState({
        open: true,
        class: styles.sectionOpen,
        dropdown: "./../../../images/pledge/minusbox.png"
      })
    }
  }

  renderCollateralItems(collateralItem) {
    let collaterals = this.props.collateral

    if (collaterals) {
      let x = collaterals.get(collateralItem)
      return this.renderItems(x)
    }
  }

  renderItems(value) {
    return value.map((x) => {
      return (
        <div className={this.state.class}>
          <div>{x.get('assetName')}</div>
          <div>{x.get('price')}</div>
          <div>{x.get('ccy')}</div>
          <div>{x.get('deliveryTime')}</div>
          <div>{x.get('status')}</div>
          <div>{x.get('rating')}</div>
          <div>{x.get('maturityDate')}</div>
          <div>{x.get('internalCostPct')}</div>
          <div>{x.get('externalCostPct')}</div>
          <div>{x.get('OppCostPct')}</div>
          <div>{x.get('isin')}</div>
          <div>{x.get('venue')}</div>
          <div>{x.get('acctId')}</div>
        </div>
      )
    })
  }

  renderOptItems(optimisation, onUpdateOptimisationSettings){
    if(optimisation) {
      return optimisation.map(x => {
        return (<OptItem sldName={x.get('name')} allocation={x.get('rating')} onUpdate={onUpdateOptimisationSettings}/>)
      })
    }
  }

  renderSelection(x, onTogglePendingAllocation, pendingAllocation){
    return (<Selection  sideways={this.state.selectionSideway}
                        clicked={this.changeSideways}
                        chkTick={this.chkTick}
                        toggleL={this.state.toggleShowHideL}
                        toggleR={this.state.toggleShowHideR}
                        marginCall={x}
                        key={x.get('GUID')}
                        onTogglePendingAllocation={onTogglePendingAllocation}
                        pendingAllocationStore={pendingAllocation}/>)
  }

  //generic checker
  checkIfExist(something){
    return something || List()
  }

  render() {

    const { optimisation, selection, onUpdateOptimisationSettings, onTogglePendingAllocation, pendingAllocation, sliderCheckbox, onToggleCheckall } = this.props

    let collateralHeader = (
      <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
        <div className={styles.collateralCell}>Asset</div>
        <div className={styles.collateralCell}>Price</div>
        <div className={styles.collateralCell}>CCY</div>
        <div className={styles.collateralCell}>Delivery Time</div>
        <div className={styles.collateralCell}>Status</div>
        <div className={styles.collateralCell}>Rating</div>
        <div className={styles.collateralCell}>Maturity Date</div>
      </div>
    )

    if(this.state.open){
      collateralHeader = (
        <div className={styles.collateralRow + ' ' + styles.collateralHeader + ' ' + styles.collateralTableExpanded}>
          <div className={styles.collateralCell}>Asset</div>
          <div className={styles.collateralCell}>Price</div>
          <div className={styles.collateralCell}>CCY</div>
          <div className={styles.collateralCell}>Del. Time</div>
          <div className={styles.collateralCell}>Status</div>
          <div className={styles.collateralCell}>Rating</div>
          <div className={styles.collateralCell}>Maturi. Date</div>
          <div className={styles.collateralCell}>Int. Cost</div>
          <div className={styles.collateralCell}>Ext. Cost</div>
          <div className={styles.collateralCell}>Opp. Cost</div>
          <div className={styles.collateralCell}>ISIN</div>
          <div className={styles.collateralCell}>Venue</div>
          <div className={styles.collateralCell}>Acc ID</div>
        </div>
      )
    }

    return (

        <div className={styles.pledgeContainer}>
          <div className={styles.sliderAndStatus}>
            <div className={styles.panel} id={styles.optSetting}>
              <div className={styles.panelTitle}>Optimization Setting</div>
              <div className={styles.optPnlWrap}>
                {this.renderOptItems(optimisation, onUpdateOptimisationSettings)}
              </div>
              <div className={styles.buttonHolder}>
                <ChooseCalls tickImg={sliderCheckbox[0]} tickState={sliderCheckbox[1]}
                             tickClick={onToggleCheckall} />
                <div className={styles.optButton + (this.checkIfExist(pendingAllocation).size > 0 ? ' '+styles.btnEnabled : ' '+styles.btnDisabled )} id={styles.optBtnAllocate}>Allocate</div>
                <div className={styles.optButton + ' ' + styles.btnEnabled} id={styles.optBtnPledge}>Pledge</div>
              </div>
              {/* change btnEnabled to btnDisabled to disable the button*/}
            </div>

            <div className={styles.panel} id={styles.pleStatus}>
              {/*<div className={styles.panelTitle}>Pledge Status</div>*/}
              <img src="./../../../images/pledge/Pledge-status-widget.png"/>
            </div>
          </div>

          <div className={styles.secDivider}></div>

          <div className={styles.flexContainer}>
            <div className={styles.col_L + ' ' + this.state.toggleColwidthL}>

              {this.checkIfExist(selection).map(x => this.renderSelection(x, onTogglePendingAllocation, pendingAllocation))}

            </div>

            <div className={styles.col_R + ' ' + this.state.toggleColwidthR}>
              <div className={styles.panel}>
                <div className={styles.panelTitle}>Collateral
                  <img src={this.state.sideways} className={styles.imageRight} onClick={this.changeSideways}/>
                </div>

                <div className={styles.collateralTable}>



                  {collateralHeader}

                  <CollateralAssetGroup propCollateralType={"Earmarked"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('earmarked').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Cash"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('cash').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"MM Instruments"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('mmInstruments').toJS() : [] }
                                        propIsExpanded={true}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Soverign Bonds"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('sovereignBonds').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Govt Agencies"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('govtAgencies').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Corporate Debt"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('corporateDebt').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>

                  <CollateralAssetGroup propCollateralType={"Corporate Equity"}
                                        propCollateralAssetList={
                                          this.props.collateral ? this.props.collateral.get('corporateEquity').toJS() : [] }
                                        propIsExpanded={false}
                                        propIsDisplayAll={this.state.open}/>
                </div>

              </div>
            </div>

          </div>
        </div>

    )
  }
}

export default Pledge