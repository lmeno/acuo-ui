import React from 'react'
import TableHead from './sub-components/TableHead'
import styles from './Table.css'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
    this.renderTable = this.renderTable.bind(this)
  }

  renderTable(deriv) {
    return (<TableHead key={deriv.get('type')} deriv={deriv} redirect={this.props.redirect}/>)
  }

  getDeriv() {
    return this.props.derivatives || []
  }

  render() {
    return (
      <div className={styles.tableComponent}>
        {this.getDeriv().map(this.renderTable)}
      </div>
    );
  }

}