import React, {PropTypes} from 'react'
import styles from '../Pledge.css'

const CollateralAsset = ({
  rowStyle,
  propAsset,
  propPrice,
  propCcy,
  propDeliveryTime,
  propStatus,
  propRating,
  propMaturityDate,
  propInternalCost,
  propExternalCost,
  propOppCost,
  propIsin,
  propVenue,
  propAcctId,
  propIsDisplayAll
}) => {
  let additionalInfo = null

  if (propIsDisplayAll) {
    return(
      <div className={styles.collateralRow}>
        <div className={styles.collateralCell}>{propAsset}</div>
        <div className={styles.collateralCell}>{propPrice}</div>
        <div className={styles.collateralCell}>{propCcy}</div>
        <div className={styles.collateralCell}>{propDeliveryTime}</div>
        <div className={styles.collateralCell}>{propStatus}</div>
        <div className={styles.collateralCell}>{propRating}</div>
        <div className={styles.collateralCell}>{propMaturityDate}</div>
        <div className={styles.collateralCell}>{propInternalCost}</div>
        <div className={styles.collateralCell}>{propExternalCost}</div>
        <div className={styles.collateralCell}>{propOppCost}</div>
        <div className={styles.collateralCell}>{propIsin}</div>
        <div className={styles.collateralCell}>{propVenue}</div>
        <div className={styles.collateralCell}>{propAcctId}</div>
      </div>
    )
  }else{
    return (
      <div className={styles.collateralRow}>
        <div className={styles.collateralCell}>{propAsset}</div>
        <div className={styles.collateralCell}>{propPrice}</div>
        <div className={styles.collateralCell}>{propCcy}</div>
        <div className={styles.collateralCell}>{propDeliveryTime}</div>
        <div className={styles.collateralCell}>{propStatus}</div>
        <div className={styles.collateralCell}>{propRating}</div>
        <div className={styles.collateralCell}>{propMaturityDate}</div>
      </div>
    )
  }



}

{/*<div>{propInternalCost}</div>
 <div>{propExternalCost}</div>
 <div>{propOppCost}</div>
 <div>{propIsin}</div>
 <div>{propVenue}</div>
 <div>{propAcctId}</div>*/
}
export default CollateralAsset


CollateralAsset.defaultProps = {
  propAsset: "",
  propPrice: "",
  propCcy: "",
  propDeliveryTime: "",
  propStatus: "",
  propRating: "",
  propMaturityDate: "",
  propInternalCost: "",
  propExternalCost: "",
  propOppCost: "",
  propIsin: "",
  propVenue: "",
  propAcctId: ""
}