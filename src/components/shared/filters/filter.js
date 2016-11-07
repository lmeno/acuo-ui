/**
 * Created by vikassaryal on 26/10/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import {List, Set} from 'immutable'

import * as actionCreators from '../../../action_creators'

import styles from './filter.css'

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filterBarNameClicked: true,
            filterBar: styles.open,
            filterItems: styles.show
        }
        this.getDeriv = this.getDeriv.bind(this)
        this.handleLegalEntityChange = this.handleLegalEntityChange.bind(this)
        this.handleDerivChange = this.handleDerivChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleCptyOrgChange = this.handleCptyOrgChange.bind(this)
        this.handleCPTYChange = this.handleCPTYChange.bind(this)
    }
    getDeriv(){
        return this.props.derivatives || List()
    }

    handleLegalEntityChange(e){
       this.props.filterStateLegal(e.target.value)
    }

    handleDerivChange(e){
        this.props.filterStateDeriv(e.target.value)
    }

    handleStatusChange(e){
        this.props.filterStateStatus(e.target.value)
    }

    handleCptyOrgChange(e){
        this.props.filterCptyOrg(e.target.value)
    }

    handleCPTYChange(e){
        this.props.filterCptyEntity(e.target.value)
    }

    fetchActionList(){
        return this.getDeriv().reduce((listSumZ, derivative)=>{
            return listSumZ.union(derivative.get('marginStatus').reduce((listSumY, marginStatus)=>{
                return listSumY.union(marginStatus.get('timeFrames').reduce((listSumX, timeFrames)=>{
                    return listSumX.union(timeFrames.get('actionsList'))
                  },Set()))
              }, Set()))
          }, Set())

    }


    renderFilter(deriv, index){
        return (
            <option key={index} value={deriv.get('type')}>{deriv.get('type').toUpperCase()} </option>)
    }

    renderLegalEntity(){
      return this.fetchActionList().reduce((listSum , x)=>{
        return(!listSum.includes(x.get('legalEntity')) ? listSum.add(x.get('legalEntity')):listSum)},Set()).map((x)=>{
        return (<option key={x} value={x}>{x.toUpperCase()} </option>)
      })

    }


    renderStatus(){
        return this.getDeriv().reduce((listSumZ, derivative)=>{
            return listSumZ.union(derivative.get('marginStatus').reduce((listSum, marginStatus)=>{
                return (!listSum.includes(marginStatus.get('status')) ? listSum.add(marginStatus.get('status')) : listSum)
            }, Set()))
        }, Set()).toList().map((x) => {
            return (<option key={x} value={x}>{x.toUpperCase()} </option>)})
    }

    renderVenue(){
     return this.fetchActionList().reduce((listSum , x)=>{
         return(!listSum.includes(x.get('cptyOrg')) ? listSum.add(x.get('cptyOrg')):listSum)},Set()).map((x)=>{
       return (<option key={x} value={x}>{x.toUpperCase()} </option>)
       })
    }

    renderCPTY(){
      return this.fetchActionList().reduce((listSum , x)=>{
        return(!listSum.includes(x.get('cptyEntity')) ? listSum.add(x.get('cptyEntity')):listSum)},Set()).map((x)=>{
        return (<option key={x} value={x}>{x.toUpperCase()} </option>)
      })
    }

    render(){
        return(
        <div className={styles.filterContainer}>
            <div className={styles.filterBarName + ' ' + this.state.filterBar} onClick={this.clickedDropdown}>
                <span>Filter</span>
                <div className={styles.switchArrow}>
                    <div className={styles.arrowLine} id={styles.line1}></div>
                    <div className={styles.arrowLine} id={styles.line2}></div>
                </div>
            </div>
            <div className={styles.filterItemWrap + ' ' + this.state.filterItems}>
                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Legal Entity</label>
                    <select className={styles.filters} id = "filter-legalEntity" onChange={this.handleLegalEntityChange}>
                        <option value="All">ALL</option>
                        {this.renderLegalEntity()}
                    </select>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Deriv Type</label>
                    <select className={styles.filters} id = "filter-derivtype" onChange={this.handleDerivChange}>
                        <option value="All">ALL</option>
                        {this.getDeriv().map(this.renderFilter)}
                    </select>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Status</label>
                    <select className={styles.filters} id = "filter-status" onChange={this.handleStatusChange}>
                        <option value="All">ALL</option>
                        {this.renderStatus()}
                    </select>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>Venue</label>
                    <select className={styles.filters} id = "filter-venue" onChange={this.handleCptyOrgChange}>
                        <option value="All">ALL</option>
                        {this.renderVenue()}
                    </select>
                    <div className={styles.filterDropdownArrow}></div>
                </div>

                <div className={styles.filterItem}>
                    <label className={styles.filterLabel}>CPTY</label>
                    <select className={styles.filters} id = "filter-cpty" onChange={this.handleCPTYChange}>
                        <option value="All">ALL</option>
                      {this.renderCPTY()}
                    </select>
                    <div className={styles.filterDropdownArrow}></div>
                </div>
            </div>
        </div>
        )

    }
}

function mapStateToProps(state){
    return{
        derivatives : state.getIn(['data', 'derivatives'])
    }
}

export const FilterContainer = connect(mapStateToProps, actionCreators)(Filter)