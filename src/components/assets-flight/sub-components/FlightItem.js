import React, {Proptypes} from 'react'
import {ARRIVALS} from '../../../constants/FlightTypes'
import FlightItemTable from './FlightItemTable'
import styles from './FlightItem.css'


export default class FlightItem extends React.Component {
  isArrival(flightType){
    return flightType == ARRIVALS
  }

  searchThisText(x){
    let { action } = this.props
    // x && console.log( "Searching for:" , x);
    this.isArrival(this.props.name)? action.arrivalSearch(x) : action.departureSearch(x);
  }

  render() {
    let imgUrl
    this.isArrival(this.props.name)? imgUrl = "./images/assets_deployed/icon_arrival_plane.png" : imgUrl = "./images/assets_deployed/icon_departure_plane.png"

    let data = this.isArrival(this.props.name)? this.props.data.searchedArrivals : this.props.data.searchedDepartures
    let searchText = this.isArrival(this.props.name)? this.props.data.arrivals_searchText : this.props.data.departures_searchText

    return (
      <div className={styles.flightItemComponent}>
        <div className={styles.flightTitle}>
          <span className={styles.flightTitleText + " " +
          (this.isArrival(this.props.name) ? styles.flightTitleText_arr : "")}>
            {this.props.name}</span>
          <img className={styles.iconStyle} src={imgUrl}/>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.headerDates}>Dates</div>
          <input className={styles.headerSearch}
                 type="text"
                 placeholder="Search"
                 value={searchText}
                 onChange={(e)=>{this.searchThisText(e.target.value)}}
                 />
        </div>
        <FlightItemTable isArrival={this.isArrival(this.props.name)} data={data}/>
      </div>
    )
  }
}
