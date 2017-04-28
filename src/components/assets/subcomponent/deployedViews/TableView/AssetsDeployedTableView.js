import React from 'react';
import { connect } from 'react-redux'
import styles from './AssetsDeployedTableView.css'
import NavBar from "../Navbar.js"
import NavBarStyle from "../NavBar.css"
import Table from '../TableUI/TableUI.js'
import { AssetsPanel } from '../../../../../actions/AssetsActions.js'

/*  AssetsDeployedTableView shall contain only presentational components to form the tableUI
      - All table components should come from tableUi.js  */

export default class AssetsDeployedTableView extends React.Component{
 constructor(props){
  super(props)
 }

 render(){
  let actions = this.props.actions

  let IsVarMarginSelected = this.props.state.ui.IsVarMarginSelected
  let IsRegionSelected = this.props.state.ui.IsRegionSelected

  let categoryHeader = this.props.categoryHeader
  let dataHeader = this.props.dataHeader

  let Content = this.props.tableContent
  let TableStyle = this.props.tableStyle

  return (
    <div className={styles.tableView}>
     <Table.RowGroup style={TableStyle.RowGroupStyle}>
      <Table.ColGroup style={TableStyle.RegCptyColGroupStyle}>
       <NavBar>
        <div className={ (IsRegionSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs ) }
             onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}}
         >
          Region
        </div>
        <div className={(IsRegionSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected)}
             onClick={()=>{actions.DeployedPanel_ToggleRegionCounterparty(!IsRegionSelected)}}
         >
          Counterparty
        </div>
       </NavBar>
       <Table.DataRow content={categoryHeader} style={TableStyle.RegCptyHeadStyle} />

      </Table.ColGroup>
      <Table.ColGroup style={TableStyle.VarMarginColGroupStyle}>
       <NavBar>
        <div className={IsVarMarginSelected? NavBarStyle.tabs : NavBarStyle.tabs + " " + NavBarStyle.selected }
             onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected ) }} >
          Initial Margin
        </div>
        <div className={IsVarMarginSelected? NavBarStyle.tabs + " " + NavBarStyle.selected : NavBarStyle.tabs  }
             onClick={()=>{actions.DeployedPanel_ToggleInitVarMargin( !IsVarMarginSelected )  }}  >
          Variation Margin
        </div>
       </NavBar>
       <Table.DataRow content={dataHeader} style={TableStyle.VarMarginHeadStyle} />
      </Table.ColGroup>
     </Table.RowGroup>

     {Content.map((rowBlock, idx)=>{
      return(
       <Table.RowGroup style={TableStyle.DataBlockStyle} key={idx}>
         <Table.DataRow content={rowBlock.CategoryContent} style={TableStyle.RowStyle1} />
         <Table.ColGroup style={TableStyle.InnerColGroupStyle}>
          {rowBlock.RowContent.map((rowData,idy)=>{
            return(
             <Table.DataRow content={rowData} style={TableStyle.RowStyle2} key={idy}/>
            )
          })}
         <Table.DataRow content={rowBlock.PledgeContent} style={TableStyle.RowPledgeExcessStyle} />
         <Table.DataRow content={rowBlock.ExcessContent} style={TableStyle.RowPledgeExcessStyle} />
         </Table.ColGroup>
       </Table.RowGroup>
      )
     })}

    </div>
   )
 }
}
